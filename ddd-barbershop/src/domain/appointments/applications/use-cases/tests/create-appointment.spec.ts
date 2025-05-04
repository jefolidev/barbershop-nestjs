import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAppointment } from '@/tests/factories/make-appointment'
import { makeBarber } from '@/tests/factories/make-barber'
import { makeClient } from '@/tests/factories/make-client'
import { makeService } from '@/tests/factories/make-service'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { InMemoryBarberRepository } from '@/tests/repositories/in-memory-barber.repository'
import { InMemoryClientRepository } from '@/tests/repositories/in-memory-client.repository'
import { CreateAppointmentUseCase } from '../create-appointment'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let inMemoryBarberRepository: InMemoryBarberRepository
let inMemoryClientRepository: InMemoryClientRepository
let sut: CreateAppointmentUseCase

describe('Create Appointment', () => {
  beforeAll(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    inMemoryBarberRepository = new InMemoryBarberRepository()
    inMemoryClientRepository = new InMemoryClientRepository()
    sut = new CreateAppointmentUseCase(
      inMemoryAppointmentRepository,
      inMemoryBarberRepository,
      inMemoryClientRepository
    )
  })

  it('should be able to create a appointment', async () => {
    const barber = makeBarber({
      fullName: 'Jeferson Franco',
    })

    const client = makeClient({
      fullName: 'barber',
    })

    await inMemoryBarberRepository.create(barber)
    await inMemoryClientRepository.create(client)

    const appointment = makeAppointment({
      barberId: barber.id,
      clientId: client.id,
    })

    const result = await sut.execute(appointment)
    // console.log(result) // Console no erro

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const appointment = result.value?.appointment

      expect(appointment?.paymentId).toBe(undefined)
      expect(appointment?.status).toBe('pending')
      expect(appointment?.services).toHaveLength(1)
    }
  })

  it('should not be able to create a appointment with two same services', async () => {
    const barber = makeBarber()
    const client = makeClient()

    await inMemoryBarberRepository.create(barber)
    await inMemoryClientRepository.create(client)

    const id = new UniqueEntityId('service-1')

    const appointment = makeAppointment({
      barberId: barber.id,
      clientId: client.id,
      scheduleDate: new Date(),
      services: [
        makeService({ name: 'Corte', price: 40 }, id),
        makeService({ name: 'Corte', price: 40 }, id),
      ],
    })

    const result = await sut.execute(appointment)
    // console.log(result.isLeft()) // Console no erro

    expect(result.isLeft()).toBe(true)

    if (result.isLeft()) {
      expect(result.value.message).toBe(
        'Duplicated services are not allowed in the same schedule.'
      )
    }
  })

  it('should not be able to create a appointment if schedule dont match with barber work time ', async () => {
    const barber = makeBarber({
      workSchedule: [
        {
          dayOfWeek: 1,
          startTime: '12:00',
          endTime: '18:00',
        },
      ],
    })
    const client = makeClient()

    await inMemoryBarberRepository.create(barber)
    await inMemoryClientRepository.create(client)

    const appointment = makeAppointment({
      barberId: barber.id,
      clientId: client.id,
      scheduleDate: new Date('2025/05/02'),
      services: [makeService({ name: 'Corte', price: 40 })],
    })

    const result = await sut.execute(appointment)
    // console.log(result.isLeft()) // Console no erro

    expect(result.isLeft()).toBe(true)

    if (result.isLeft()) {
      expect(result.value.message).toBe(
        'The selected date/time is not available for this barber.'
      )
    }
  })

  it('should not be able to create a appointment with two same services', async () => {
    const barber = makeBarber()
    const client = makeClient()

    await inMemoryBarberRepository.create(barber)
    await inMemoryClientRepository.create(client)

    const id = new UniqueEntityId('service-1')

    const appointment = makeAppointment({
      barberId: barber.id,
      clientId: client.id,
      scheduleDate: new Date(),
      services: [
        makeService({ name: 'Corte', price: 40 }, id),
        makeService({ name: 'Corte', price: 40 }, id),
      ],
    })

    const result = await sut.execute(appointment)
    // console.log(result.isLeft()) // Console no erro

    expect(result.isLeft()).toBe(true)

    if (result.isLeft()) {
      expect(result.value.message).toBe(
        'Duplicated services are not allowed in the same schedule.'
      )
    }
  })

  it('should not be able to create a appointment if barber do not work at scheduled date', async () => {
    const barber = makeBarber({
      blockedWorkSchedule: [{ dayOfWeek: 5 }],
      workSchedule: [
        {
          dayOfWeek: 6,
          startTime: '8:00',
          endTime: '18:00',
        },
      ],
    })
    const client = makeClient()

    await inMemoryBarberRepository.create(barber)
    await inMemoryClientRepository.create(client)

    const appointment = makeAppointment({
      barberId: barber.id,
      clientId: client.id,
      scheduleDate: new Date(2025, 4, 2, 16, 0), // Sexta feira
      services: [makeService({ name: 'Corte', price: 40 })],
    })

    const result = await sut.execute(appointment)
    // console.log(result.value) // Console no erro

    expect(result.isLeft()).toBe(true)

    if (result.isLeft()) {
      expect(result.value.message).toBe(
        'This barber dont work at selected time.'
      )
    }
  })

  it('should not be able to create a appointment if barber have another scheduled appointment at same time', async () => {
    const barber = makeBarber({
      upcomingAppointments: [
        makeAppointment({ scheduleDate: new Date('2025-05-05T10:00:00') }),
      ],
    })

    const client = makeClient()

    await inMemoryBarberRepository.create(barber)
    await inMemoryClientRepository.create(client)

    const appointment = makeAppointment({
      barberId: barber.id,
      clientId: client.id,
      scheduleDate: new Date('2025-05-05T10:00:00'),
    })

    const result = await sut.execute(appointment)

    expect(result.isLeft()).toBe(true)

    if (result.isLeft()) {
      const error = result.value.message

      expect(error).toBe('An appointment already exist at this time.')
    }
  })
})
