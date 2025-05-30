import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { DomainEvent } from '@/core/events/domain-event'
import type { Appointment } from '../entities/appointment'

export class AppointmentCanceledByBarberEvent implements DomainEvent {
  public ocurredAt: Date
  public appointment: Appointment
  public reason?: string

  constructor(appointment: Appointment, reason?: string) {
    this.appointment = appointment
    this.ocurredAt = new Date()
    this.reason = reason
  }
  getAggregateId(): UniqueEntityId {
    return this.appointment.id
  }
}
