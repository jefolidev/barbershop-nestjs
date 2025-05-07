import { left, right, type Either } from '@/core/either'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import type { Appointment } from '../../enterprise/entities/appointment'
import type { AppointmentRepository } from '../repositories/appointment.repository'

interface FetchAppointmentsByBarberUseCaseRequest {
  barberId: string
  status?: 'pending' | 'in_progress' | 'completed' | 'canceled' | 'no_show'
  dateRange?: {
    start: Date
    end: Date
  }
}
type FetchAppointmentsByBarberUseCaseUseCaseResponse = Either<
  NotFoundError,
  {
    upcomingAppointments: Appointment[]
  }
>

export class FetchAppointmentsByBarberUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    barberId,
    status,
    dateRange,
  }: FetchAppointmentsByBarberUseCaseRequest): Promise<FetchAppointmentsByBarberUseCaseUseCaseResponse> {
    const appointments =
      await this.appointmentRepository.findManyByBarberId(barberId)

    if (!appointments || appointments.length === 0) {
      return left(new NotFoundError('No appointments found for this barber.'))
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
