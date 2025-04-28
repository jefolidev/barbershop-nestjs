import { right, type Either } from '@/core/either'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Appointment } from '../../enterprise/entities/appointment'
import type { Service } from '../../enterprise/entities/service'
import type { AppointmentRepository } from '../repositories/appointment.repository'

interface CreateAppointmentRequest {
  barberId: UniqueEntityId
  clientId: UniqueEntityId
  scheduleDate: Date
  services: Service[]
}

type CreateAppointmentResponse = Either<
  null,
  {
    appointment: Appointment
  }
>

export class CreateAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    barberId,
    clientId,
    scheduleDate,
    services,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const appointment = Appointment.create({
      barberId,
      clientId,
      scheduleDate,
      services,
    })

    await this.appointmentRepository.create(appointment)

    return right({
      appointment,
    })
  }
}
