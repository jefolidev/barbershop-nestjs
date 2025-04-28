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

  set services(services: Service[]) {
    this.props.services = services
    this.touch()
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
        status: 'pending',
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return appointment
  }
}
