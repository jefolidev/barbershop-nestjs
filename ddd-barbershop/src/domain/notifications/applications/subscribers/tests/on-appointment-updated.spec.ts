import { makeAppointment } from '@/tests/factories/make-appointment'
import { makeBarber } from '@/tests/factories/make-barber'
import { makeClient } from '@/tests/factories/make-client'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { InMemoryBarberRepository } from '@/tests/repositories/in-memory-barber.repository'
import { InMemoryClientRepository } from '@/tests/repositories/in-memory-client.repository'
import { InMemoryNotificationRepository } from '@/tests/repositories/in-memory-notification.repository'
import type { MockInstance } from 'vitest'
import {
  SendNotificationUseCase,
  type SendNotificationUseCaseRequest,
  type SendNotificationUseCaseResponse,
} from '../../use-cases/send-notification'
import { OnAppointmentUpdated } from '../on-appointment-updated'

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

describe('On Appointment Updated', () => {
  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    inMemoryBarberRepository = new InMemoryBarberRepository()
    inMemoryClientRepository = new InMemoryClientRepository()
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository
    )

    sendNotificationExectueSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAppointmentUpdated(
      inMemoryBarberRepository,
      inMemoryClientRepository,
      sendNotificationUseCase
    )
  })

  it('should send a notification when an appointment is updated', async () => {
    const barber = makeBarber()
    const client = makeClient()

    await inMemoryBarberRepository.create(barber)
    await inMemoryClientRepository.create(client)

    const appointment = makeAppointment({
      barberId: barber.id,
      clientId: client.id,
      scheduleDate: new Date('2025-06-06'),
    })

    console.log(`antigad data: ${appointment.scheduleDate}`)

    await inMemoryAppointmentRepository.create(appointment)

    sendNotificationExectueSpy.mockClear()

    appointment.scheduleDate = new Date('2025-06-07')

    console.log(`nova data: ${appointment.scheduleDate}`)

    await inMemoryAppointmentRepository.save(appointment)

    await vi.waitFor(
      () => {
        expect(sendNotificationExectueSpy).toHaveBeenCalled()
      },
      { timeout: 1000 }
    )

    expect(appointment.scheduleDate).toEqual(new Date('2025-06-07'))
  })
})
