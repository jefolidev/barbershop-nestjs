import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import { PAYMENT_METHOD } from '@/core/types/payment-method'

type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface PaymentProps {
  appointmentId: UniqueEntityId
  amount: number
  method: PAYMENT_METHOD
  status: PaymentStatus
  paidAt?: Date
  createdAt: Date
}

export class Payment extends Entity<PaymentProps> {
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

  set status(status: 'pending' | 'paid' | 'failed' | 'refunded') {
    this.props.status = status
  }

  get createdAt() {
    return this.props.createdAt
  }

  isPaid(): boolean {
    return this.props.status === 'paid' && this.props.paidAt != null
  }

  isPending(): boolean {
    return this.props.status === 'pending'
  }

  isRefunded(): boolean {
    return this.props.status === 'refunded'
  }

  create(props: Optional<PaymentProps, 'createdAt'>, id?: UniqueEntityId) {
    const payment = new Payment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return payment
  }
}
