import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { DomainEvent } from '@/core/events/domain-event'
import type { Appointment } from '../entities/appointment'

export class AppointmentReminderEvent implements DomainEvent {
  public ocurredAt: Date
  public appointment: Appointment
  public remindAt: Date

  constructor(appointment: Appointment, remindAt: Date) {
    this.appointment = appointment
    this.remindAt = remindAt
    this.ocurredAt = new Date()
  }
  getAggregateId(): UniqueEntityId {
    return this.appointment.id
  }
}
