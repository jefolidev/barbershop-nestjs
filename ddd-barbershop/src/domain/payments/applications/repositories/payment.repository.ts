import type { Payment } from '../../enterprise/entities/payment'

export interface PaymentRepository {
  create(payment: Payment): Promise<void>
  findById(paymentId: string): Promise<Payment | null>
  save(payment: Payment): Promise<void>
}
