import { left, right, type Either } from '@/core/either'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Appointment } from '../../enterprise/entities/appointment'
import type { Service } from '../../enterprise/entities/service'
import type { AppointmentRepository } from '../repositories/appointment.repository'
import type { BarberRepository } from '../repositories/barber.repository'

import { BadRequestError } from '@/core/errors/bad-request-error'
import { NoDisponibilityError } from '@/core/errors/no-disponibility-error'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import type { ClientRepository } from '../repositories/client.repository'

dayjs.extend(isBetween)

interface CreateAppointmentUseCaseRequest {
  barberId: UniqueEntityId
  clientId: UniqueEntityId
  scheduleDate: Date
  services: Service[]
}

type CreateAppointmentUseCaseResponse = Either<
  NoDisponibilityError | NotFoundError,
  {
    appointment: Appointment
  }
>

export class CreateAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private barberRepository: BarberRepository,
    private clientRepository: ClientRepository
  ) {}

  async execute({
    barberId,
    clientId,
    scheduleDate,
    services,
  }: CreateAppointmentUseCaseRequest): Promise<CreateAppointmentUseCaseResponse> {
    const barberOfCurrentSchedule = await this.barberRepository.findById(
      barberId.toString()
    )
    const clientOfCurrentSchedule = await this.clientRepository.findById(
      clientId.toString()
    )

    if (!barberOfCurrentSchedule) {
      return left(new NotFoundError('Barber not founded.'))
    }

    if (!clientOfCurrentSchedule) {
      return left(new NotFoundError('Client not founded'))
    }

    const appointment = Appointment.create({
      barberId,
      clientId,
      scheduleDate,
      services,
    })

    const dayOfScheduleDate = appointment.scheduleDate.getDay()

    const barberAvailableTimes = barberOfCurrentSchedule?.workSchedule
    const barberBlockedTimes = barberOfCurrentSchedule?.blockedWorkSchedule

    const hasDisponibility = barberAvailableTimes.some((dates) => {
      const start = dayjs(scheduleDate)
        .hour(Number((dates.startTime ?? '00:00').split(':')[0]))
        .minute(Number((dates.startTime ?? '00:00').split(':')[1]))

      const end = dayjs(scheduleDate)
        .hour(Number((dates.endTime ?? '23:59').split(':')[0]))
        .minute(Number((dates.endTime ?? '23:59').split(':')[1]))

      const isDateAvailable = dates.dayOfWeek === dayOfScheduleDate
      const isHoursAvailable = dayjs(appointment.scheduleDate).isBetween(
        start,
        end
      )

      return isDateAvailable && isHoursAvailable
    })

    const isBlockedDay = barberBlockedTimes.some((blockedDate) => {
      const start = dayjs(scheduleDate)
        .hour(Number((blockedDate.startTime ?? '00:00').split(':')[0]))
        .minute(Number((blockedDate.startTime ?? '00:00').split(':')[1]))

      const end = dayjs(scheduleDate)
        .hour(Number((blockedDate.endTime ?? '23:59').split(':')[0]))
        .minute(Number((blockedDate.endTime ?? '23:59').split(':')[1]))

      const isDateBlocked = blockedDate.dayOfWeek === dayOfScheduleDate

      const isInBlockedTime = dayjs(scheduleDate).isBetween(
        start,
        end,
        null,
        '[]'
      )

      return isDateBlocked && isInBlockedTime
    })

    const servicesIds = services.map((service) => service.id.toValue())
    const uniqueServiceId = new Set(servicesIds)

    if (servicesIds.length !== uniqueServiceId.size) {
      return left(
        new BadRequestError(
          'Duplicated services are not allowed in the same schedule.'
        )
      )
    }

    const barberAppointments =
      await this.appointmentRepository.findManyByBarberId(barberId.toString())

    const hasScheduleInSameHour = barberAppointments.some((appointment) => {
      return dayjs(appointment.scheduleDate).isSame(scheduleDate, 'minute')
    })

    if (hasScheduleInSameHour) {
      return left(
        new NoDisponibilityError('An appointment already exist at this time.')
      )
    }

    if (isBlockedDay) {
      return left(
        new NoDisponibilityError('This barber doesnt work at selected time.')
      )
    }

    if (!hasDisponibility) {
      return left(
        new NoDisponibilityError(
          'The selected date/time is not available for this barber.'
        )
      )
    }

    await this.appointmentRepository.create(appointment)

    return right({
      appointment,
    })
  }
}
