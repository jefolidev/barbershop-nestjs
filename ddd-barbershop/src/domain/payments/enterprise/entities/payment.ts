import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import {
  PAYMENT_METHOD,
  type PAYMENT_MODALITY,
  type PaymentStatus,
} from '@/core/types/payment'
import { PaymentSuccessEvent } from '@/domain/appointments/enterprise/events/payment-success-event'

export interface PaymentProps {
  appointmentId: UniqueEntityId
  amount: number
  method: PAYMENT_METHOD
  modality: PAYMENT_MODALITY
  isPaid: boolean
  status: PaymentStatus
  paidAt?: Date
  createdAt: Date
}

export class Payment extends AggregateRoot<PaymentProps> {
  get appointmentId() {
    return this.props.appointmentId
  }

  get amount() {
    return this.props.amount
  }

  set amount(amount: number) {
    this.props.amount = amount
  }

  get method() {
    return this.props.method
  }

  set method(method: PAYMENT_METHOD) {
    this.props.method = method
  }

  get status() {
    return this.props.status
  }

  set status(status: PaymentStatus) {
    this.props.status = status
  }

  get createdAt() {
    return this.props.createdAt
  }

  get isPaid(): boolean {
    return this.props.isPaid
  }

  set isPaid(isPaid: boolean) {
    if (this.props.status === 'paid') {
      this.props.isPaid = true
      this.props.paidAt = new Date()
    }
  }

  get paidAt(): Date | undefined {
    return this.props.paidAt
  }

  isPending(): boolean {
    return this.props.status === 'pending'
  }

  isRefunded(): boolean {
    return this.props.status === 'refunded'
  }

  static create(
    props: Optional<PaymentProps, 'createdAt' | 'isPaid' | 'status'>,
    id?: UniqueEntityId
  ) {
    const payment = new Payment(
      {
        ...props,
        status: props.status ?? 'pending',
        isPaid: props.isPaid ?? false,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    const isNewPayment = !id

    if (isNewPayment) {
      payment.addDomainEvent(new PaymentSuccessEvent(payment))
    }

    return payment
  }
}
