import { left, right, type Either } from '@/core/either'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import type { Appointment } from '../../enterprise/entities/appointment'
import type { AppointmentRepository } from '../repositories/appointment.repository'

interface CancelAppointmentUseCaseRequest {
  appointmentId: string
}

type CancelAppointmentUseCaseResponse = Either<
  NotFoundError,
  {
    appointment: Appointment
  }
>

export class CancelAppointmentUseCase {
  constructor(private appointmentsRepository: AppointmentRepository) {}

  async execute({
    appointmentId,
  }: CancelAppointmentUseCaseRequest): Promise<CancelAppointmentUseCaseResponse> {
    const appointment =
      await this.appointmentsRepository.findManyById(appointmentId)

    if (!appointment) {
      return left(new NotFoundError())
    }

    appointment.status = 'cancelled'
    await this.appointmentsRepository.save(appointment)

    return right({ appointment })
  }
}
