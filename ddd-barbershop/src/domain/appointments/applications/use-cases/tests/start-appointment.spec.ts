import { makeAppointment } from '@/tests/factories/make-appointment'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { StartAppointmentUseCase } from '../start-appointment'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: StartAppointmentUseCase

describe('Start an Appointment', () => {
  beforeAll(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new StartAppointmentUseCase(inMemoryAppointmentRepository)
  })

  it('should be possible to start an appointment', async () => {
    const newAppointment = makeAppointment()

    await inMemoryAppointmentRepository.create(newAppointment)

    const appointmentId = newAppointment.id.toString()

    const result = await sut.execute({
      appointmentId,
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(inMemoryAppointmentRepository.items[0]?.status).toBe('in_progress')
      expect(inMemoryAppointmentRepository.items[0]?.updatedAt).toEqual(
        expect.any(Date)
      )
    }
  })
})
