import { left, right, type Either } from '@/core/either'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import type { Appointment } from '../../enterprise/entities/appointment'
import type { AppointmentRepository } from '../repositories/appointment.repository'

interface FetchBarberScheduledAppointmentsUseCaseRequest {
  barberId: string
}

type FetchBarberScheduledAppointmentsUseCaseResponse = Either<
  null | NotFoundError,
  {
    upcomingAppointments: Appointment[]
  }
>

export class FetchBarberScheduledAppointmentsUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    barberId,
  }: FetchBarberScheduledAppointmentsUseCaseRequest): Promise<FetchBarberScheduledAppointmentsUseCaseResponse> {
    if (!barberId) {
      return left(new NotFoundError('Barber not founded'))
    }

    const barberAppointments =
      await this.appointmentRepository.findManyByBarberId(barberId)

    const upcomingAppointments = barberAppointments.filter(
      (appoitment) => appoitment.status === 'pending'
    )

    return right({ upcomingAppointments })
  }
}
