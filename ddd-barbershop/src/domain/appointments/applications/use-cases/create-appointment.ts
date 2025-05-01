import { right, type Either } from '@/core/either'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Appointment } from '../../enterprise/entities/appointment'
import type { Service } from '../../enterprise/entities/service'
import type { AppointmentRepository } from '../repositories/appointment.repository'

interface CreateAppointmentUseCaseRequest {
  barberId: UniqueEntityId
  clientId: UniqueEntityId
  scheduleDate: Date
  services: Service[]
}

type CreateAppointmentUseCaseResponse = Either<
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
  }: CreateAppointmentUseCaseRequest): Promise<CreateAppointmentUseCaseResponse> {
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
