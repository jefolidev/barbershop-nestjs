import { PAYMENT_METHOD, PAYMENT_MODALITY } from '@/core/types/payment'
import { Payment } from '@/domain/payments/enterprise/entities/payment'
import { makeAppointment } from '@/tests/factories/make-appointment'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { InMemoryNotificationRepository } from '@/tests/repositories/in-memory-notification.repository'
import { InMemoryPaymentRepository } from '@/tests/repositories/in-memory-payment.repository'
import { MockInstance } from 'vitest'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../../use-cases/send-notification'
import { OnPaymentSuccess } from '../on-payment-success'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let inMemoryNotificationRepository: InMemoryNotificationRepository
let inMemoryPaymentRepository: InMemoryPaymentRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExectueSpy: MockInstance<
  (
    request: SendNotificationUseCaseRequest
  ) => Promise<SendNotificationUseCaseResponse>
>

describe('On Success Payment', () => {
  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    inMemoryPaymentRepository = new InMemoryPaymentRepository()
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository
    )

    sendNotificationExectueSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnPaymentSuccess(inMemoryAppointmentRepository, sendNotificationUseCase)
  })

  it('should send a notification to barber when the client make the payment', async () => {
    const appointment = makeAppointment()

    await inMemoryAppointmentRepository.create(appointment)

    const payment = Payment.create({
      appointmentId: appointment.id,
      amount: appointment.totalPrice,
      method: PAYMENT_METHOD.CREDIT,
      modality: PAYMENT_MODALITY.IN_PERSON,
    })

    await inMemoryPaymentRepository.create(payment)

    await vi.waitFor(() => {
      expect(sendNotificationExectueSpy).toHaveBeenCalled()
    })
  })
})
