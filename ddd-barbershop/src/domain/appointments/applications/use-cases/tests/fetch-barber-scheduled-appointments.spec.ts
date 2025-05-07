import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAppointment } from '@/tests/factories/make-appointment'
import { makeBarber } from '@/tests/factories/make-barber'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { FetchBarberScheduledAppointmentsUseCase } from '../fetch-barber-scheduled-appointments'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: FetchBarberScheduledAppointmentsUseCase

describe('Fetch Barber Available Hours', () => {
  beforeAll(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new FetchBarberScheduledAppointmentsUseCase(
      inMemoryAppointmentRepository
    )
  })

  it('should fetch the barber appointments', async () => {
    const barber = makeBarber({
      id: new UniqueEntityId('barber-1'),
    })

    const appointment = makeAppointment({
      barberId: barber.id,
    })

    const alreadyFinishedAppointment = makeAppointment({
      barberId: barber.id,
      status: 'completed',
    })

    inMemoryAppointmentRepository.create(appointment)
    inMemoryAppointmentRepository.create(alreadyFinishedAppointment)

    const result = await sut.execute({
      barberId: 'barber-1',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.upcomingAppointments[0]?.status).toBe('pending')
      expect(result.value.upcomingAppointments).toHaveLength(1)
    }
  })
})
