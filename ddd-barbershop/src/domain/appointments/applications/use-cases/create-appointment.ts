import { left, right, type Either } from '@/core/either'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Appointment } from '../../enterprise/entities/appointment'
import type { Service } from '../../enterprise/entities/service'
import type { AppointmentRepository } from '../repositories/appointment.repository'
import type { BarberRepository } from '../repositories/barber.repository'

import { NoDisponibilityError } from '@/core/errors/no-disponibility-error'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

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
    private barberRepository: BarberRepository
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

    if (!barberOfCurrentSchedule) {
      return left(new NotFoundError())
    }

    const appointment = Appointment.create({
      barberId,
      clientId,
      scheduleDate,
      services,
    })

    const barberAvailableTimes = barberOfCurrentSchedule?.workSchedule
    const dayOfScheduleDate = appointment.scheduleDate.getDay()

    const hasDisponibility = barberAvailableTimes.some((dates) => {
      const [startHourStr, startMinuteStr] = dates.startTime.split(':')
      const [endHourStr, endMinuteStr] = dates.endTime.split(':')

      const barberInitialHour = dayjs(appointment.scheduleDate)
        .hour(Number(startHourStr))
        .minute(Number(startMinuteStr))
        .toDate()
      const barberLastHour = dayjs(appointment.scheduleDate)
        .hour(Number(endHourStr))
        .minute(Number(endMinuteStr))
        .toDate()

      return (
        dates.dayOfWeek === dayOfScheduleDate &&
        dayjs(appointment.scheduleDate).isBetween(
          dayjs(barberInitialHour),
          dayjs(barberLastHour)
        )
      )
    })

    if (!hasDisponibility) {
      return left(new NoDisponibilityError())
    }

    await this.appointmentRepository.create(appointment)

    return right({
      appointment,
    })
  }
}
