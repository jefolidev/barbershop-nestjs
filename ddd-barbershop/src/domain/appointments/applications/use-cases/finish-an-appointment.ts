import { left, right, type Either } from '@/core/either'
import { BadRequestError } from '@/core/errors/bad-request-error'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import type { Appointment } from '../../enterprise/entities/appointment'
import type { AppointmentRepository } from '../repositories/appointment.repository'

interface FinishAnAppointmentUseCaseRequest {
  appointmentId: string
}

type FinishAnAppointmentUseCaseResponse = Either<
  NotFoundError | BadRequestError,
  {
    appointment: Appointment
  }
>

export class FinishAnAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    appointmentId,
  }: FinishAnAppointmentUseCaseRequest): Promise<FinishAnAppointmentUseCaseResponse> {
    const appointment = await this.appointmentRepository.findById(appointmentId)

    if (!appointment) return left(new NotFoundError('Appointment not found.'))

    try {
      appointment.complete()
    } catch (err) {
      return left(new BadRequestError(String(err)))
    }

    await this.appointmentRepository.save(appointment)

    return right({
      appointment: appointment,
    })
  }
}
