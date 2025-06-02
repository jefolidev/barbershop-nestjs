import { PAYMENT_METHOD, PAYMENT_MODALITY } from '@/core/types/payment'
import { makeAppointment } from '@/tests/factories/make-appointment'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { InMemoryPaymentRepository } from '@/tests/repositories/in-memory-payment.repository'
import { CreatePaymentUseCase } from '../create-payment'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let inMemoryPaymentRepository: InMemoryPaymentRepository
let sut: CreatePaymentUseCase

describe('Create A Payment', () => {
  beforeAll(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    inMemoryPaymentRepository = new InMemoryPaymentRepository()
    sut = new CreatePaymentUseCase(
      inMemoryAppointmentRepository,
      inMemoryPaymentRepository
    )
  })

  it('should be possible to create a presencial payment process', async () => {
    const appointment = makeAppointment()

    await inMemoryAppointmentRepository.create(appointment)

    const result = await sut.execute({
      appointmentId: appointment.id,
      method: PAYMENT_METHOD.PIX,
      modality: PAYMENT_MODALITY.IN_PERSON,
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const payment = result.value.payment
      console.log('Paga presencialmente', JSON.stringify(payment, null, 2))

      expect(payment.isPaid).toBe(false)
      expect(payment.status).toMatch('pending')
    }
  })

  it('should be possible to create a remote payment process', async () => {
    const appointment = makeAppointment()

    await inMemoryAppointmentRepository.create(appointment)

    const result = await sut.execute({
      appointmentId: appointment.id,
      method: PAYMENT_METHOD.PIX,
      modality: PAYMENT_MODALITY.IN_APP,
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const payment = result.value.payment
      console.log('Paga remotamente', JSON.stringify(payment, null, 2))

      expect(payment.isPaid).toBe(true)
      expect(payment.status).toMatch('paid')
    }
  })
})
