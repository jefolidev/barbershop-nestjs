import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import type { Service } from './service'

export interface AppointmentProps {
  clientId: UniqueEntityId
  barberId: UniqueEntityId
  paymentId?: UniqueEntityId
  services: Service[]
  status: 'pending' | 'completed' | 'cancelled'
  scheduleDate: Date
  createdAt: Date
  canceledAt?: Date
  updatedAt?: Date
  completedAt?: Date
}

export class Appointment extends Entity<AppointmentProps> {
  private touch() {
    this.props.updatedAt = new Date()
  }

  get clientId() {
    return this.props.clientId
  }

  get barberId() {
    return this.props.barberId
  }

  get paymentId(): UniqueEntityId | undefined {
    return this.props.paymentId
  }

  get services() {
    return this.props.services
  }

  get status() {
    return this.props.status
  }

  set status(status: 'pending' | 'completed' | 'cancelled') {
    this.props.status = status
  }

  get scheduleDate() {
    return this.props.scheduleDate
  }

  get canceledAt(): Date | undefined {
    return this.props.canceledAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  get completedAt(): Date | undefined {
    return this.props.completedAt
  }

  set completedAt(completedAt: Date) {
    this.props.completedAt = completedAt
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  isOverdue(): boolean {
    return (
      this.props.status === 'pending' &&
      this.props.scheduleDate.getDate() < Date.now()
    )
  }

  hasPayment(): boolean {
    return !!this.props.paymentId
  }

  cancel() {
    if (this.props.status === 'completed') {
      throw new Error('This appointment is already completed.')
    }

    this.props.status = 'cancelled'
    this.props.canceledAt = new Date()
  }

  complete() {
    if (this.props.status !== 'pending') {
      throw new Error('Only pending appointments can be completed.')
    }

    this.props.status = 'completed'
    this.props.completedAt = new Date()
  }

  reschedule(newDate: Date) {
    if (this.props.status !== 'pending') {
      throw new Error(
        "It's only possible reschedule an appointment that is pending"
      )
    }

    if (this.props.paymentId) {
      throw new Error(
        "It's not possible to reschedule an appointment that has already been paid."
      )
    }

    this.props.scheduleDate = newDate
    this.touch()
  }

  updateServices(services: Service[]) {
    this.props.services = services
    this.touch()
  }

  addPayment(paymentId: UniqueEntityId) {
    if (!paymentId) {
      throw new Error('Payment ID must be provided.')
    }

    if (this.hasPayment()) {
      throw new Error('Payment has already been assigned.')
    }

    this.props.paymentId = paymentId
    this.touch()
  }

  static create(
    props: Optional<AppointmentProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const appointment = new Appointment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return appointment
  }
}
