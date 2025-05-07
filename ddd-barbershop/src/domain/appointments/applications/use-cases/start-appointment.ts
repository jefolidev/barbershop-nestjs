import { left, right, type Either } from '@/core/either'
import { BadRequestError } from '@/core/errors/bad-request-error'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import type { Appointment } from '../../enterprise/entities/appointment'
import type { AppointmentRepository } from '../repositories/appointment.repository'

interface StartAppointmentUseCaseRequest {
  appointmentId: string
}

type StartAppointmentUseCaseResponse = Either<
  NotFoundError | BadRequestError,
  {
    appointment: Appointment
  }
>

export class StartAppointmentUseCase {
  constructor(private appointmentsRepository: AppointmentRepository) {}

  async execute({
    appointmentId,
  }: StartAppointmentUseCaseRequest): Promise<StartAppointmentUseCaseResponse> {
    const appointment =
      await this.appointmentsRepository.findById(appointmentId)

    if (!appointment) {
      return left(new NotFoundError())
    }

    try {
      appointment.start()
    } catch (err) {
      return left(new BadRequestError(String(err)))
    }

    await this.appointmentsRepository.save(appointment)

    return right({ appointment })
  }
}
