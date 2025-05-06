import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAppointment } from '@/tests/factories/make-appointment'
import { makeClient } from '@/tests/factories/make-client'
import { InMemoryClientRepository } from '@/tests/repositories/in-memory-client.repository'
import dayjs from 'dayjs'
import { FetchLastAppointmentsUseCase } from '../fetch-last-appointments'

let inMemoryClientRepository: InMemoryClientRepository
let sut: FetchLastAppointmentsUseCase

describe('Fetch Client Last Appointments', () => {
  beforeAll(() => {
    inMemoryClientRepository = new InMemoryClientRepository()
    sut = new FetchLastAppointmentsUseCase(inMemoryClientRepository)
  })

  it('should fetch the client last 4 month appointments', async () => {
    const client = makeClient({
      id: new UniqueEntityId('client-1'),
    })

    const recentAppointment = makeAppointment({
      scheduleDate: dayjs().subtract(2, 'month').toDate(),
    })

    const oldAppointment = makeAppointment({
      scheduleDate: dayjs().subtract(6, 'month').toDate(),
    })

    client.pastAppointments = [recentAppointment, oldAppointment]

    inMemoryClientRepository.create(client)

    const result = await sut.execute({
      clientId: 'client-1',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.pastAppointments).toHaveLength(1)
      expect(result.value.pastAppointments[0]).toEqual(recentAppointment)
    }
  })

  it('deve retornar apenas agendamentos dos últimos 4 meses com o status correto', async () => {
    const client = makeClient({ id: new UniqueEntityId('client-01') })

    const recentCompleted = makeAppointment({
      scheduleDate: dayjs().subtract(2, 'month').toDate(),
      status: 'completed',
    })

    const recentPending = makeAppointment({
      scheduleDate: dayjs().subtract(1, 'month').toDate(),
      status: 'pending',
    })

    const oldCompleted = makeAppointment({
      scheduleDate: dayjs().subtract(6, 'month').toDate(),
      status: 'completed',
    })

    client.pastAppointments = [recentCompleted, recentPending, oldCompleted]

    await inMemoryClientRepository.create(client)

    const result = await sut.execute({
      clientId: client.id.toString(),
      status: 'completed',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.pastAppointments).toHaveLength(1)

      expect(result.value.pastAppointments[0]?.status).toBe('completed')

      expect(
        dayjs(result.value.pastAppointments[0]?.scheduleDate).isAfter(
          dayjs().subtract(4, 'month')
        )
      ).toBe(true)
    }
  })
})
