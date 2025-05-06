import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAppointment } from '@/tests/factories/make-appointment'
import { makeClient } from '@/tests/factories/make-client'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { FetchClientScheduledAppointmentsUseCase } from '../fetch-client-scheduled-appontments'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: FetchClientScheduledAppointmentsUseCase

describe('Fetch Client Available Hours', () => {
  beforeAll(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new FetchClientScheduledAppointmentsUseCase(
      inMemoryAppointmentRepository
    )
  })

  it('should fetch the client appointments', async () => {
    const client = makeClient({
      id: new UniqueEntityId('client-1'),
    })

    const appointment = makeAppointment({
      clientId: client.id,
    })

    const alreadyFinishedAppointment = makeAppointment({
      clientId: client.id,
      status: 'completed',
    })

    inMemoryAppointmentRepository.create(appointment)
    inMemoryAppointmentRepository.create(alreadyFinishedAppointment)

    const result = await sut.execute({
      clientId: 'client-1',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.upcomingAppointments[0]?.status).toBe('pending')
      expect(result.value.upcomingAppointments).toHaveLength(1)
    }
  })
})
