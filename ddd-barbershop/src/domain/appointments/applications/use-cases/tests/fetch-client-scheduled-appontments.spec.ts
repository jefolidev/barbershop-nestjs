import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAppointment } from '@/tests/factories/make-appointment'
import { makeClient } from '@/tests/factories/make-client'
import { InMemoryClientRepository } from '@/tests/repositories/in-memory-client.repository'
import { FetchClientScheduledAppointmentsUseCase } from '../fetch-client-scheduled-appontments'

let inMemoryClientRepository: InMemoryClientRepository
let sut: FetchClientScheduledAppointmentsUseCase

describe('Fetch Client Available Hours', () => {
  beforeAll(() => {
    inMemoryClientRepository = new InMemoryClientRepository()
    sut = new FetchClientScheduledAppointmentsUseCase(inMemoryClientRepository)
  })

  it('should fetch the client appointments', async () => {
    const client = makeClient({
      id: new UniqueEntityId('client-1'),
      fullName: 'John Doe',
      upcomingAppointments: [
        makeAppointment({ scheduleDate: new Date('2025-05-05T10:00:00') }),
      ],
    })

    inMemoryClientRepository.create(client)

    const result = await sut.execute({
      clientId: 'client-1',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.upcomingAppointments[0]).toBe(
        client.upcomingAppointments[0]
      )
    }
  })
  
})
