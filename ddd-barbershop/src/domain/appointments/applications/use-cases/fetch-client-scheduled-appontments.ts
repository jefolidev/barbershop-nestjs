import { left, right, type Either } from '@/core/either'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import type { Appointment } from '../../enterprise/entities/appointment'
import type { ClientRepository } from '../repositories/client.repository'

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
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    clientId,
  }: FetchClientScheduledAppointmentsUseCaseRequest): Promise<FetchClientScheduledAppointmentsUseCaseResponse> {
    const client = await this.clientRepository.findById(clientId)

    if (!client || !clientId) {
      return left(new NotFoundError('Client not founded'))
    }

    return right({ upcomingAppointments: client.upcomingAppointments })
  }
}
