import type { Payment } from '../../enterprise/entities/payment'

export interface PaymentRepository {
  create(payment: Payment): Promise<void>
  fetchPayments(): Promise<Payment[]>
  findById(paymentId: string): Promise<Payment | null>
  save(payment: Payment): Promise<void>
}
