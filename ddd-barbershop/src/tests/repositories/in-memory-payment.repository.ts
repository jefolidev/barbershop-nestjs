import { DomainEvents } from '@/core/events/domain-events'
import type { PaymentRepository } from '@/domain/payments/applications/repositories/payment.repository'
import { Payment } from '@/domain/payments/enterprise/entities/payment'

export class InMemoryPaymentRepository implements PaymentRepository {
  public items: Payment[] = []

  async create(payment: Payment): Promise<void> {
    this.items.push(payment)

    DomainEvents.dispatchEventsForAggregate(payment.id)
  }

  async fetchPayments(): Promise<Payment[]> {
    return this.items
  }

  async findById(paymentId: string) {
    const payment = this.items.find(
      (payment) => payment.id.toString() === paymentId
    )

    return payment ?? null
  }

  async save(payment: Payment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === payment.id)

    this.items[itemIndex] = payment

    DomainEvents.dispatchEventsForAggregate(payment.id)
  }
}
