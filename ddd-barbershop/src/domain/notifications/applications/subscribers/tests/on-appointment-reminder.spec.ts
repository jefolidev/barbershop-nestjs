import { makeAppointment } from '@/tests/factories/make-appointment'
import { makeBarber } from '@/tests/factories/make-barber'
import { makeClient } from '@/tests/factories/make-client'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { InMemoryBarberRepository } from '@/tests/repositories/in-memory-barber.repository'
import { InMemoryClientRepository } from '@/tests/repositories/in-memory-client.repository'
import { InMemoryNotificationRepository } from '@/tests/repositories/in-memory-notification.repository'
import dayjs from 'dayjs'
import type { MockInstance } from 'vitest'
import {
  SendNotificationUseCase,
  type SendNotificationUseCaseRequest,
  type SendNotificationUseCaseResponse,
} from '../../use-cases/send-notification'
import { OnAppointmentReminder } from '../on-appointment-reminder'

let inMemoryBarberRepository: InMemoryBarberRepository
let inMemoryClientRepository: InMemoryClientRepository
let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let inMemoryNotificationRepository: InMemoryNotificationRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExectueSpy: MockInstance<
  (
    request: SendNotificationUseCaseRequest
  ) => Promise<SendNotificationUseCaseResponse>
>

describe('On Appointment Reminder', () => {
  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    inMemoryBarberRepository = new InMemoryBarberRepository()
    inMemoryClientRepository = new InMemoryClientRepository()
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository
    )

    sendNotificationExectueSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAppointmentReminder(
      inMemoryBarberRepository,
      inMemoryClientRepository,
      sendNotificationUseCase
    )
  })

  it('should send a notification when an appointment reminder is triggered', async () => {
    const barber = makeBarber()
    const client = makeClient()

    await inMemoryBarberRepository.create(barber)
    await inMemoryClientRepository.create(client)

    const scheduleDate = dayjs().add(30, 'minutes').toDate()

    const appointment = makeAppointment({
      barberId: barber.id,
      clientId: client.id,
      scheduleDate,
    })

    await inMemoryAppointmentRepository.create(appointment)

    await vi.waitFor(() => {
      expect(sendNotificationExectueSpy).toHaveBeenCalled()
    })
  })

  it('should not send a notification if appointment is more than 30 minutes away', async () => {
    const barber = makeBarber()
    const client = makeClient()

    await inMemoryBarberRepository.create(barber)
    await inMemoryClientRepository.create(client)

    const scheduleDate = dayjs().add(60, 'minutes').toDate()

    const appointment = makeAppointment({
      barberId: barber.id,
      clientId: client.id,
      scheduleDate,
    })

    await inMemoryAppointmentRepository.create(appointment)

    await vi.waitFor(() => {
      expect(sendNotificationExectueSpy).not.toHaveBeenCalled()
    })
  })
})
