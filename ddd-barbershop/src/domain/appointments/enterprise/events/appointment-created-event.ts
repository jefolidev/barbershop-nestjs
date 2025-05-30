import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { DomainEvent } from '@/core/events/domain-event'
import type { Appointment } from '../entities/appointment'

export class AppointmentCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public appointment: Appointment

  constructor(appointment: Appointment) {
    this.appointment = appointment
    this.ocurredAt = new Date()
  }
  getAggregateId(): UniqueEntityId {
    return this.appointment.id
  }
}
