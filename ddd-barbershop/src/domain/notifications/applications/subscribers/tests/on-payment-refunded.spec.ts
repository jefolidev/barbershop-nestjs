import { PAYMENT_METHOD, PAYMENT_MODALITY } from '@/core/types/payment'
import { Payment } from '@/domain/payments/enterprise/entities/payment'
import { makeAppointment } from '@/tests/factories/make-appointment'
import { makeClient } from '@/tests/factories/make-client'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { InMemoryClientRepository } from '@/tests/repositories/in-memory-client.repository'
import { InMemoryNotificationRepository } from '@/tests/repositories/in-memory-notification.repository'
import { InMemoryPaymentRepository } from '@/tests/repositories/in-memory-payment.repository'
import type { MockInstance } from 'vitest'
import {
  SendNotificationUseCase,
  type SendNotificationUseCaseRequest,
  type SendNotificationUseCaseResponse,
} from '../../use-cases/send-notification'
import { OnAppointmentRefunded } from '../on-payment-refunded'

let inMemoryClientRepository: InMemoryClientRepository
let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let inMemoryNotificationRepository: InMemoryNotificationRepository
let inMemoryPaymentRepository: InMemoryPaymentRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExectueSpy: MockInstance<
  (
    request: SendNotificationUseCaseRequest
  ) => Promise<SendNotificationUseCaseResponse>
>

describe('On Appointment Refunded', () => {
  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    inMemoryClientRepository = new InMemoryClientRepository()
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    inMemoryPaymentRepository = new InMemoryPaymentRepository()

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository
    )

    sendNotificationExectueSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAppointmentRefunded(
      inMemoryAppointmentRepository,
      inMemoryClientRepository,
      sendNotificationUseCase
    )
  })

  it('should send a notification when an payment is refunded', async () => {
    const client = makeClient()

    await inMemoryClientRepository.create(client)

    const appointment = makeAppointment({
      clientId: client.id,
    })

    inMemoryAppointmentRepository.create(appointment)

    const payment = Payment.create({
      appointmentId: appointment.id,
      amount: appointment.totalPrice,
      method: PAYMENT_METHOD.CREDIT,
      modality: PAYMENT_MODALITY.IN_PERSON,
    })

    await inMemoryPaymentRepository.create(payment)

    payment.status = 'refunded'

    await inMemoryPaymentRepository.save(payment)

    await vi.waitFor(() => {
      expect(sendNotificationExectueSpy).toHaveBeenCalled()
    })
  })
})
