import { PAYMENT_MODALITY } from '@/core/types/payment'
import { makePayment } from '@/tests/factories/make-payment'
import { InMemoryPaymentRepository } from '@/tests/repositories/in-memory-payment.repository'
import dayjs from 'dayjs'
import { FetchPaymentsUseCase } from '../fetch-poyments'

let inMemoryPaymentRepository: InMemoryPaymentRepository
let sut: FetchPaymentsUseCase

describe('Fetch Payments', () => {
  beforeEach(() => {
    inMemoryPaymentRepository = new InMemoryPaymentRepository()
    sut = new FetchPaymentsUseCase(inMemoryPaymentRepository)
  })

  it('should be possible return all the payments maded', async () => {
    const payment = makePayment()

    await inMemoryPaymentRepository.create(payment)

    const result = await sut.execute({})

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const payments = result.value.payments

      expect(payments).toHaveLength(1)
    }
  })

  it('should be possible return payments by status', async () => {
    const payment = makePayment({
      modality: PAYMENT_MODALITY.IN_PERSON,
      status: 'pending',
    })

    await inMemoryPaymentRepository.create(payment)

    const result = await sut.execute({
      status: 'pending',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const payments = result.value.payments

      expect(payments).toHaveLength(1)
      expect(payments[0]?.status).toMatch('pending')
      expect(payments.every((p) => p.status === 'pending')).toBe(true)
    }
  })

  it('should be possible return payments by date', async () => {
    const payment = makePayment({
      createdAt: new Date('2025-06-13'),
    })

    const olderPayment1 = makePayment({
      createdAt: new Date('2025-06-02'),
    })

    await inMemoryPaymentRepository.create(payment)
    await inMemoryPaymentRepository.create(olderPayment1)

    const result = await sut.execute({
      dateRange: {
        start: new Date('2025-06-01'),
        end: new Date(),
      },
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const payments = result.value.payments

      expect(payments).toHaveLength(2)
      expect(
        payments.every((p) => dayjs(p.createdAt).isAfter('2025-06-01'))
      ).toBe(true)
    }
  })

  it('should be possible return payments by date and status', async () => {
    const payment = makePayment({
      createdAt: new Date('2025-06-13'),
      status: 'paid',
    })

    const payment2 = makePayment({
      createdAt: new Date('2025-06-02'),
      status: 'paid',
    })

    const payment3 = makePayment({
      createdAt: new Date('2025-06-02'),
      status: 'pending',
    })

    await inMemoryPaymentRepository.create(payment)
    await inMemoryPaymentRepository.create(payment2)
    await inMemoryPaymentRepository.create(payment3)

    const result = await sut.execute({
      dateRange: {
        start: new Date('2025-06-01'),
        end: new Date(),
      },
      status: 'paid',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const payments = result.value.payments

      expect(payments).toHaveLength(2)
      expect(payments.every((p) => p.status === 'paid')).toBe(true)
    }
  })
})
