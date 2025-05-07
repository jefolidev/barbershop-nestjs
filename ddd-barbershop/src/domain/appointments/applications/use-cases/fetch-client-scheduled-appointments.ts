import { left, right, type Either } from '@/core/either'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import type { Appointment } from '../../enterprise/entities/appointment'
import type { AppointmentRepository } from '../repositories/appointment.repository'

interface FetchClientScheduledAppointmentsUseCaseRequest {
  clientId: string
}

type FetchClientScheduledAppointmentsUseCaseResponse = Either<
  null | NotFoundError,
  {
    upcomingAppointments: Appointment[]
  }
>

export class FetchClientScheduledAppointmentsUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    clientId,
  }: FetchClientScheduledAppointmentsUseCaseRequest): Promise<FetchClientScheduledAppointmentsUseCaseResponse> {
    if (!clientId) {
      return left(new NotFoundError('Client not founded'))
    }

    const clientAppointments =
      await this.appointmentRepository.findManyByClientId(clientId)

    const upcomingAppointments = clientAppointments.filter(
      (appoitment) => appoitment.status === 'pending'
    )

    return right({ upcomingAppointments })
  }
}
