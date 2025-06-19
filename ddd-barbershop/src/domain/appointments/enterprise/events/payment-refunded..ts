import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { DomainEvent } from '@/core/events/domain-event'
import type { Payment } from '@/domain/payments/enterprise/entities/payment'

export class PaymentRefundedEvent implements DomainEvent {
  public ocurredAt: Date
  public payment: Payment

  constructor(payment: Payment) {
    this.payment = payment
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.payment.id
  }
}
