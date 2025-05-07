import { left, right, type Either } from '@/core/either'
import { BadRequestError } from '@/core/errors/bad-request-error'
import { NoDisponibilityError } from '@/core/errors/no-disponibility-error'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import type { Appointment } from '../../enterprise/entities/appointment'
import type { AppointmentRepository } from '../repositories/appointment.repository'
import type { BarberRepository } from '../repositories/barber.repository'

dayjs.extend(isBetween)

interface RescheduleAnAppointmentUseCaseRequest {
  appointmentId: string
  newScheduleDate: Date
}

type RescheduleAnAppointmentUseCaseResponse = Either<
  NotFoundError | BadRequestError | NoDisponibilityError,
  {
    rescheduledAppointment: Appointment
  }
>

export class RescheduleAnAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private barberRepository: BarberRepository
  ) {}

  async execute({
    appointmentId,
    newScheduleDate,
  }: RescheduleAnAppointmentUseCaseRequest): Promise<RescheduleAnAppointmentUseCaseResponse> {
    if (!appointmentId) return left(new NotFoundError('Appointment not found.'))

    const appointment = await this.appointmentRepository.findById(appointmentId)

    if (!appointment) return left(new NotFoundError('Appointment not found.'))

    if (appointment.status !== 'pending')
      return left(new BadRequestError('This appointment is already finished'))

    const currentBarber = await this.barberRepository.findById(
      appointment.barberId.toString()
    )

    if (!currentBarber) return left(new NotFoundError('Barber not found.'))

    const barberAppointments =
      await this.appointmentRepository.findManyByBarberId(
        appointment.barberId.toString()
      )

    if (dayjs(newScheduleDate).isBefore(appointment?.scheduleDate))
      return left(
        new BadRequestError(
          "The new date shouldn't be older than the current schedule date"
        )
      )

    const hasScheduleInSameHour = barberAppointments.some((appointment) => {
      return dayjs(appointment.scheduleDate).isSame(newScheduleDate, 'minute')
    })

    const dayOfNewScheduleDate = newScheduleDate.getDay()

    const isBlockedDay = currentBarber?.blockedWorkSchedule.some(
      (blockedDate) => {
        const start = dayjs(newScheduleDate)
          .hour(Number((blockedDate.startTime ?? '00:00').split(':')[0]))
          .minute(Number((blockedDate.startTime ?? '00:00').split(':')[1]))

        const end = dayjs(newScheduleDate)
          .hour(Number((blockedDate.endTime ?? '23:59').split(':')[0]))
          .minute(Number((blockedDate.endTime ?? '23:59').split(':')[1]))

        const isDateBlocked = blockedDate.dayOfWeek === dayOfNewScheduleDate

        const isInBlockedTime = dayjs(newScheduleDate).isBetween(
          start,
          end,
          null,
          '[]'
        )

        return isDateBlocked && isInBlockedTime
      }
    )
    const hasDisponibility = currentBarber.workSchedule.some((dates) => {
      const start = dayjs(newScheduleDate)
        .hour(Number((dates.startTime ?? '00:00').split(':')[0]))
        .minute(Number((dates.startTime ?? '00:00').split(':')[1]))

      const end = dayjs(newScheduleDate)
        .hour(Number((dates.endTime ?? '23:59').split(':')[0]))
        .minute(Number((dates.endTime ?? '23:59').split(':')[1]))

      const isDateAvailable = dates.dayOfWeek === dayOfNewScheduleDate
      const isHoursAvailable = dayjs(newScheduleDate).isBetween(
        start,
        end,
        'minute',
        '[]'
      )

      return isDateAvailable && isHoursAvailable
    })

    if (!hasDisponibility) {
      return left(
        new NoDisponibilityError(
          'The selected date/time is not available for this barber.'
        )
      )
    }

    if (isBlockedDay) {
      return left(
        new NoDisponibilityError('This barber doesnt work at selected time.')
      )
    }

    if (hasScheduleInSameHour) {
      return left(
        new NoDisponibilityError('An appointment already exist at this time.')
      )
    }

    appointment.scheduleDate = newScheduleDate

    await this.appointmentRepository.save(appointment)

    return right({
      rescheduledAppointment: appointment,
    })
  }
}
