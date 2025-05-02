import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Appointment,
  AppointmentProps,
} from '@/domain/appointments/enterprise/entities/appointment'
import { makeBarber } from './make-barber'
import { makeCategory } from './make-category'
import { makeClient } from './make-client'
import { makeService } from './make-service'

type Override = Partial<AppointmentProps>

export function makeAppointment(override: Override = {}, id?: UniqueEntityId) {
  const clientId = override.clientId ?? makeClient().id
  const barberId = override.barberId ?? makeBarber().id
  const category = makeCategory({ name: 'Cabelo' })

  const service = makeService({ category })

  return Appointment.create(
    {
      clientId,
      barberId,
      scheduleDate: new Date(),
      services: [service],
      ...override,
    },
    id
  )
}
