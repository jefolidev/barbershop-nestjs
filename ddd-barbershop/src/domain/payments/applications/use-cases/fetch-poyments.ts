import { left, right, type Either } from '@/core/either'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import type { PaymentStatus } from '@/core/types/payment'
import type { Payment } from '../../enterprise/entities/payment'
import type { PaymentRepository } from '../repositories/payment.repository'

interface FetchPaymentsUseCaseRequest {
  status?: PaymentStatus
  dateRange?: {
    start: Date
    end: Date
  }
}

type FetchPaymentsUseCaseResponse = Either<
  NotFoundError,
  {
    payments: Payment[]
  }
>

export class FetchPaymentsUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute({
    dateRange,
    status,
  }: FetchPaymentsUseCaseRequest): Promise<FetchPaymentsUseCaseResponse> {
    const payments = await this.paymentRepository.fetchPayments()

    const filteredPayments = payments.filter((payment) => {
      const matchesStatus = status ? payment.status === status : true

      const matchesDate = dateRange
        ? payment.createdAt >= dateRange.start &&
          payment.createdAt <= dateRange.end
        : true

      return matchesStatus && matchesDate
    })

    if (filteredPayments.length === 0) {
      return left(new NotFoundError())
    }

    return right({
      payments: filteredPayments,
    })
  }
}
