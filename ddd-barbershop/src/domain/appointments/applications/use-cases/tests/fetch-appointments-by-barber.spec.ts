import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAppointment } from '@/tests/factories/make-appointment'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { FetchAppointmentsByBarberUseCase } from '../fetch-appointments-by-barber'

describe('Fetch Appointments By Barber Use Case', () => {
  let appointmentRepository: InMemoryAppointmentRepository
  let sut: FetchAppointmentsByBarberUseCase

  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository()
    sut = new FetchAppointmentsByBarberUseCase(appointmentRepository)
  })

  it('should fetch only completed appointments for a barber', async () => {
    const completedAppointment = makeAppointment({
      barberId: new UniqueEntityId('barber-01'),
      status: 'completed',
      scheduleDate: new Date('2025-05-10'),
    })

    const pendingAppointment = makeAppointment({
      barberId: new UniqueEntityId('barber-01'),
      status: 'pending',
      scheduleDate: new Date('2025-05-10'),
    })

    await appointmentRepository.create(completedAppointment)
    await appointmentRepository.create(pendingAppointment)

    const result = await sut.execute({
      barberId: 'barber-01',
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
      barberId: new UniqueEntityId('barber-02'),
      status: 'completed',
      scheduleDate: new Date('2025-05-15'),
    })

    const outOfRange = makeAppointment({
      barberId: new UniqueEntityId('barber-02'),
      status: 'completed',
      scheduleDate: new Date('2025-04-01'),
    })

    await appointmentRepository.create(inRange)
    await appointmentRepository.create(outOfRange)

    const result = await sut.execute({
      barberId: 'barber-02',
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
      makeAppointment({ barberId: new UniqueEntityId('barber-03') })
    )
    await appointmentRepository.create(
      makeAppointment({ barberId: new UniqueEntityId('barber-03') })
    )

    const result = await sut.execute({
      barberId: new UniqueEntityId('barber-03').toString(),
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.upcomingAppointments).toHaveLength(2)
    }
  })

  it('should return NotFoundError if barberId is not provided', async () => {
    const result = await sut.execute({ barberId: '' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(Error)
  })
})
