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
import { OnAppointmentCanceled } from '../on-apppointment-canceled'

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

describe('On Appointment Canceled', () => {
  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    inMemoryBarberRepository = new InMemoryBarberRepository()
    inMemoryClientRepository = new InMemoryClientRepository()
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository
    )

    sendNotificationExectueSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAppointmentCanceled(
      inMemoryBarberRepository,
      inMemoryClientRepository,
      sendNotificationUseCase
    )
  })

  it('should send a notification when the client cancel an appointment is canceled', async () => {
    const barber = makeBarber()
    const client = makeClient()

    await inMemoryBarberRepository.create(barber)
    await inMemoryClientRepository.create(client)

    const appointment = makeAppointment({
      barberId: barber.id,
      clientId: client.id,
    })

    inMemoryAppointmentRepository.create(appointment)

    appointment.cancel()

    inMemoryAppointmentRepository.save(appointment)

    await vi.waitFor(() => {
      expect(sendNotificationExectueSpy).toHaveBeenCalled()
    })

    expect(appointment.canceledAt?.getDate()).toEqual(new Date().getDate())
    expect(appointment.status).toMatch('cancelled')
  })

  it('should send a notification when the barber cancel an appointment is canceled', async () => {
    const barber = makeBarber()
    const client = makeClient()

    await inMemoryBarberRepository.create(barber)
    await inMemoryClientRepository.create(client)

    const appointment = makeAppointment({
      barberId: barber.id,
      clientId: client.id,
    })

    inMemoryAppointmentRepository.create(appointment)

    appointment.cancel('Barbeiro doente.')

    inMemoryAppointmentRepository.save(appointment)

    await vi.waitFor(() => {
      expect(sendNotificationExectueSpy).toHaveBeenCalled()
    })

    expect(appointment.cancelReason).toMatch('Barbeiro doente.')
    expect(appointment.canceledAt?.getDate()).toEqual(new Date().getDate())
  })
})
