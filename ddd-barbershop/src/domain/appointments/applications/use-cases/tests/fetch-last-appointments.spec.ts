import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAppointment } from '@/tests/factories/make-appointment'
import { makeClient } from '@/tests/factories/make-client'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { InMemoryClientRepository } from '@/tests/repositories/in-memory-client.repository'
import dayjs from 'dayjs'
import { FetchLastAppointmentsUseCase } from '../fetch-last-appointments'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let inMemoryClientRepository: InMemoryClientRepository
let sut: FetchLastAppointmentsUseCase

describe('Fetch Client Last Appointments', () => {
  beforeAll(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    inMemoryClientRepository = new InMemoryClientRepository()
    sut = new FetchLastAppointmentsUseCase(inMemoryAppointmentRepository)
  })

  it('should fetch the client last 4 month appointments', async () => {
    const client = makeClient({
      id: new UniqueEntityId('client-1'),
    })

    const recentAppointment = makeAppointment({
      clientId: new UniqueEntityId('client-1'),
      scheduleDate: dayjs().subtract(2, 'month').toDate(),
    })

    const oldAppointment = makeAppointment({
      clientId: new UniqueEntityId('client-1'),
      scheduleDate: dayjs().subtract(6, 'month').toDate(),
    })

    await inMemoryClientRepository.create(client)
    await inMemoryAppointmentRepository.create(recentAppointment)
    await inMemoryAppointmentRepository.create(oldAppointment)

    const result = await sut.execute({
      clientId: client.id.toValue(),
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.pastAppointments).toHaveLength(1)
      expect(result.value.pastAppointments[0]).toEqual(recentAppointment)
    }
  })

  it('should fetch just last four monthes with completed status', async () => {
    const client = makeClient({ id: new UniqueEntityId('client-01') })

    const recentCompleted = makeAppointment({
      clientId: client.id,
      scheduleDate: dayjs().subtract(2, 'month').toDate(),
      status: 'completed',
    })

    const recentPending = makeAppointment({
      clientId: client.id,
      scheduleDate: dayjs().subtract(1, 'month').toDate(),
      status: 'pending',
    })

    const oldCompleted = makeAppointment({
      clientId: client.id,
      scheduleDate: dayjs().subtract(6, 'month').toDate(),
      status: 'completed',
    })

    await inMemoryAppointmentRepository.create(recentCompleted)
    await inMemoryAppointmentRepository.create(recentPending)
    await inMemoryAppointmentRepository.create(oldCompleted)

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
