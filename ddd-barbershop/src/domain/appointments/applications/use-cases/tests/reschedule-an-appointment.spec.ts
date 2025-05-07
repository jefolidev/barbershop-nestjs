import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAppointment } from '@/tests/factories/make-appointment'
import { makeBarber } from '@/tests/factories/make-barber'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { InMemoryBarberRepository } from '@/tests/repositories/in-memory-barber.repository'
import { RescheduleAnAppointmentUseCase } from '../reschedule-an-appointment'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let inMemoryBarberRepository: InMemoryBarberRepository
let sut: RescheduleAnAppointmentUseCase

describe('Reschedule an Appointment', () => {
  beforeAll(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    inMemoryBarberRepository = new InMemoryBarberRepository()
    sut = new RescheduleAnAppointmentUseCase(
      inMemoryAppointmentRepository,
      inMemoryBarberRepository
    )
  })

  it('should be possible to reschedule an appointment', async () => {
    const barber = makeBarber({
      id: new UniqueEntityId('barber-new'),
    })

    await inMemoryBarberRepository.create(barber)

    const newAppointment = makeAppointment({
      barberId: barber.id,
      scheduleDate: new Date('2025-05-05T10:00:00'),
    })

    await inMemoryAppointmentRepository.create(newAppointment)

    const appointmentId = newAppointment.id.toString()

    const newScheduleDate = new Date('2025-05-12T10:00:00')

    const result = await sut.execute({
      appointmentId,
      newScheduleDate,
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.rescheduledAppointment.status).toBe('pending')
      expect(result.value.rescheduledAppointment.scheduleDate).toBe(
        newScheduleDate
      )
    }
  })

  it('should return an error if the new date is earlier than the current', async () => {
    const barber = makeBarber({ id: new UniqueEntityId('new-barber') })

    await inMemoryBarberRepository.create(barber)

    const newAppointment = makeAppointment({
      barberId: barber.id,
      scheduleDate: new Date('2025-05-05T10:00:00'),
    })

    await inMemoryAppointmentRepository.create(newAppointment)

    const appointmentId = newAppointment.id.toString()

    const newScheduleDate = new Date('2025-05-01T10:00:00')

    const result = await sut.execute({
      appointmentId,
      newScheduleDate,
    })

    expect(result.isLeft()).toBe(true)

    if (result.isLeft()) {
      expect(result.value.message).toBe(
        "The new date shouldn't be older than the current schedule date"
      )
    }
  })

  it('should return an error if the new date is the same of other scheduled appointment', async () => {
    const barber = makeBarber({ id: new UniqueEntityId('new-barber') })
    await inMemoryBarberRepository.create(barber)

    const appointmentAlreadyCreated = makeAppointment({
      barberId: barber.id,
      scheduleDate: new Date('2025-05-09T10:00:00'),
    })

    const newAppointment = makeAppointment({
      barberId: barber.id,
      scheduleDate: new Date('2025-05-05T10:00:00'),
    })

    await inMemoryAppointmentRepository.create(appointmentAlreadyCreated)
    await inMemoryAppointmentRepository.create(newAppointment)

    const appointmentId = newAppointment.id.toString()

    const newScheduleDate = new Date('2025-05-09T10:00:00')

    const result = await sut.execute({
      appointmentId,
      newScheduleDate,
    })

    expect(result.isLeft()).toBe(true)

    if (result.isLeft()) {
      expect(result.value.message).toBe(
        'An appointment already exist at this time.'
      )
    }
  })
})
