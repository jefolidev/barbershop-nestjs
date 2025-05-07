import { left, right, type Either } from '@/core/either'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import type { Appointment } from '../../enterprise/entities/appointment'
import type { AppointmentRepository } from '../repositories/appointment.repository'

interface FetchAppointmentsByClientUseCaseRequest {
  clientId: string
  status?: 'pending' | 'completed' | 'canceled'
  dateRange?: {
    start: Date
    end: Date
  }
}
type FetchAppointmentsByClientUseCaseUseCaseResponse = Either<
  NotFoundError,
  {
    upcomingAppointments: Appointment[]
  }
>

export class FetchAppointmentsByClientUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    clientId,
    status,
    dateRange,
  }: FetchAppointmentsByClientUseCaseRequest): Promise<FetchAppointmentsByClientUseCaseUseCaseResponse> {
    const appointments =
      await this.appointmentRepository.findManyByClientId(clientId)

    if (!appointments || appointments.length === 0) {
      return left(new NotFoundError('No appointments found for this client.'))
    }

    const filtered = appointments.filter((appointment) => {
      const matchesStatus = status ? appointment.status === status : true

      const matchesDate = dateRange
        ? appointment.scheduleDate >= dateRange.start &&
          appointment.scheduleDate <= dateRange.end
        : true

      return matchesStatus && matchesDate
    })

    return right({ upcomingAppointments: filtered })
  }
}
