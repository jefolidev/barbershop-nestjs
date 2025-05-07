import { left, right, type Either } from '@/core/either'
import { BadRequestError } from '@/core/errors/bad-request-error'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import type { Appointment } from '../../enterprise/entities/appointment'
import type { AppointmentRepository } from '../repositories/appointment.repository'

interface CancelAppointmentUseCaseRequest {
  appointmentId: string
}

type CancelAppointmentUseCaseResponse = Either<
  NotFoundError | BadRequestError,
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
      await this.appointmentsRepository.findById(appointmentId)

    if (!appointment) {
      return left(new NotFoundError())
    }

    try {
      appointment.cancel()
    } catch (err) {
      return left(new BadRequestError(String(err)))
    }

    await this.appointmentsRepository.save(appointment)

    return right({ appointment })
  }
}
