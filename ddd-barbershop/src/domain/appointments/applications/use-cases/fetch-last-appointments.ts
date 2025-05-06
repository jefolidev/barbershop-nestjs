import { left, right, type Either } from '@/core/either'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import dayjs from 'dayjs'
import type { Appointment } from '../../enterprise/entities/appointment'
import type { ClientRepository } from '../repositories/client.repository'

interface FetchLastAppointmentsUseCaseRequest {
  clientId: string
  status?: 'pending' | 'completed' | 'cancelled'
}

type FetchLastAppointmentsUseCaseResponse = Either<
  null | NotFoundError,
  {
    pastAppointments: Appointment[]
  }
>

export class FetchLastAppointmentsUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    clientId,
    status,
  }: FetchLastAppointmentsUseCaseRequest): Promise<FetchLastAppointmentsUseCaseResponse> {
    const client = await this.clientRepository.findById(clientId)

    if (!client) {
      return left(new NotFoundError('User not founded.'))
    }

    const fourMonthsAgo = dayjs().subtract(4, 'month')

    const pastAppointments = client.pastAppointments.filter((appointment) => {
      return dayjs(appointment.scheduleDate).isAfter(fourMonthsAgo)
    })

    if (status) {
      return right({
        pastAppointments: pastAppointments.filter(
          (appointment) => appointment.status === status
        ),
      })
    }

    return right({
      pastAppointments,
    })
  }
}
