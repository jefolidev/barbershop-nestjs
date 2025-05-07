import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAppointment } from '@/tests/factories/make-appointment'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { FetchAppointmentsByClientUseCase } from '../fetch-appointments-by-client'

describe('Fetch Appointments By Client Use Case', () => {
  let appointmentRepository: InMemoryAppointmentRepository
  let sut: FetchAppointmentsByClientUseCase

  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository()
    sut = new FetchAppointmentsByClientUseCase(appointmentRepository)
  })

  it('should fetch only completed appointments for a client', async () => {
    const completedAppointment = makeAppointment({
      clientId: new UniqueEntityId('client-01'),
      status: 'completed',
      scheduleDate: new Date('2025-05-10'),
    })

    const pendingAppointment = makeAppointment({
      clientId: new UniqueEntityId('client-01'),
      status: 'pending',
      scheduleDate: new Date('2025-05-10'),
    })

    await appointmentRepository.create(completedAppointment)
    await appointmentRepository.create(pendingAppointment)

    const result = await sut.execute({
      clientId: 'client-01',
      status: 'completed',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.upcomingAppointments).toHaveLength(1)
      expect(result.value.upcomingAppointments[0]?.status).toBe('completed')
    }
  })

  it('should filter by date range', async () => {
    const inRange = makeAppointment({
      clientId: new UniqueEntityId('client-02'),
      status: 'completed',
      scheduleDate: new Date('2025-05-15'),
    })

    const outOfRange = makeAppointment({
      clientId: new UniqueEntityId('client-02'),
      status: 'completed',
      scheduleDate: new Date('2025-04-01'),
    })

    await appointmentRepository.create(inRange)
    await appointmentRepository.create(outOfRange)

    const result = await sut.execute({
      clientId: 'client-02',
      status: 'completed',
      dateRange: {
        start: new Date('2025-05-01'),
        end: new Date('2025-05-31'),
      },
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.upcomingAppointments).toHaveLength(1)
      expect(result.value.upcomingAppointments[0]?.scheduleDate).toEqual(
        new Date('2025-05-15')
      )
    }
  })

  it('should return all appointments if no filters are passed', async () => {
    await appointmentRepository.create(
      makeAppointment({ clientId: new UniqueEntityId('client-03') })
    )
    await appointmentRepository.create(
      makeAppointment({ clientId: new UniqueEntityId('client-03') })
    )

    const result = await sut.execute({
      clientId: new UniqueEntityId('client-03').toString(),
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.upcomingAppointments).toHaveLength(2)
    }
  })

  it('should return NotFoundError if clientId is not provided', async () => {
    const result = await sut.execute({ clientId: '' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(Error)
  })
})
