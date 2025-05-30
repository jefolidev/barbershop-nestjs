import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Appointment,
  AppointmentProps,
} from '@/domain/appointments/enterprise/entities/appointment'
import { makeCategory } from './make-category'
import { makeService } from './make-service'

type Override = Partial<AppointmentProps>

export function makeAppointment(override: Override = {}, id?: UniqueEntityId) {
  const category = makeCategory({ name: 'Cabelo' })

  const service = makeService({ category })

  return Appointment.create(
    {
      clientId: new UniqueEntityId(),
      barberId: new UniqueEntityId(),
      scheduleDate: new Date(),
      services: [service],
      ...override,
    },
    id
  )
}
