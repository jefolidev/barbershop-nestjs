import { AggregateRoot } from '@/core/entities/aggregate-root'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'
import { AppointmentCanceledEvent } from '../events/appointment-canceled-event'
import { AppointmentCreatedEvent } from '../events/appointment-created-event'
import { AppointmentReminderEvent } from '../events/appointment-reminder-event'
import { AppointmentUpdatedEvent } from '../events/appointment-updated-event'
import type { Service } from './service'

export interface AppointmentProps {
  clientId: UniqueEntityId
  barberId: UniqueEntityId
  paymentId?: UniqueEntityId
  services: Service[]
  status: 'pending' | 'completed' | 'cancelled' | 'in_progress' | 'no_show'
  scheduleDate: Date
  createdAt: Date
  canceledAt?: Date
  updatedAt?: Date
  completedAt?: Date
}

export class Appointment extends AggregateRoot<AppointmentProps> {
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
    if (services !== this.props.services) {
      this.addDomainEvent(new AppointmentUpdatedEvent(this))
      this.props.services = services
      this.touch()
    }
  }

  get status() {
    return this.props.status
  }

  complete() {
    if (this.props.status !== 'pending') {
      throw new Error('Only pending appointments can be completed.')
    }

    this.props.status = 'completed'
    this.props.completedAt = new Date()
  }

  cancel() {
    if (this.props.status !== 'pending') {
      throw new Error('Only pending appointments can be canceled.')
    }

    this.props.status = 'cancelled'
    this.props.canceledAt = new Date()
    this.addDomainEvent(new AppointmentCanceledEvent(this))
  }

  start() {
    if (this.props.status !== 'pending') {
      throw new Error('Only pending appointments can be seted as in progress.')
    }

    this.props.status = 'in_progress'
    this.touch()
  }

  setAsNoShow() {
    if (this.props.status !== 'pending') {
      throw new Error('Only pending appointments can be seted as in progress.')
    }

    this.props.status = 'no_show'
    this.props.canceledAt = new Date()
  }

  get scheduleDate() {
    return this.props.scheduleDate
  }

  set scheduleDate(scheduleDate: Date) {
    if (scheduleDate !== this.props.scheduleDate) {
      this.props.scheduleDate = scheduleDate
      this.addDomainEvent(new AppointmentUpdatedEvent(this))

      this.touch()
      this.scheduleReminder()
    }
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

  private scheduleReminder() {
    const reminderDate = dayjs(this.props.scheduleDate)
      .subtract(30, 'minutes')
      .toDate()
    this.addDomainEvent(new AppointmentReminderEvent(this, reminderDate))
  }

  static create(
    props: Optional<AppointmentProps, 'createdAt' | 'status'>,
    id?: UniqueEntityId
  ) {
    const appointment = new Appointment(
      {
        ...props,
        status: props.status ?? 'pending',
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    const isNewAppointment = !id

    if (isNewAppointment) {
      appointment.addDomainEvent(new AppointmentCreatedEvent(appointment))
      appointment.scheduleReminder()
    }

    return appointment
  }
}
