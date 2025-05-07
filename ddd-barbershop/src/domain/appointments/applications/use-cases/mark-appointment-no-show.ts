import { left, right, type Either } from '@/core/either'
import { BadRequestError } from '@/core/errors/bad-request-error'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import type { Appointment } from '../../enterprise/entities/appointment'
import type { AppointmentRepository } from '../repositories/appointment.repository'

interface MarkAppointmentNoShowUseCaseRequest {
  appointmentId: string
}

type MarkAppointmentNoShowUseCaseResponse = Either<
  NotFoundError | BadRequestError,
  {
    appointment: Appointment
  }
>

export class MarkAppointmentNoShowUseCase {
  constructor(private appointmentsRepository: AppointmentRepository) {}

  async execute({
    appointmentId,
  }: MarkAppointmentNoShowUseCaseRequest): Promise<MarkAppointmentNoShowUseCaseResponse> {
    const appointment =
      await this.appointmentsRepository.findById(appointmentId)

    if (!appointment) {
      return left(new NotFoundError())
    }

    try {
      appointment.setAsNoShow()
    } catch (err) {
      return left(new BadRequestError(String(err)))
    }

    await this.appointmentsRepository.save(appointment)

    return right({ appointment })
  }
}
