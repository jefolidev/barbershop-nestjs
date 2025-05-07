import { makeAppointment } from '@/tests/factories/make-appointment'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { MarkAppointmentNoShowUseCase } from '../mark-appointment-no-show'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: MarkAppointmentNoShowUseCase

describe('Mark An Appointment No Show', () => {
  beforeAll(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new MarkAppointmentNoShowUseCase(inMemoryAppointmentRepository)
  })

  it('should be possible to mark an appointment as no show', async () => {
    const newAppointment = makeAppointment()

    await inMemoryAppointmentRepository.create(newAppointment)

    const appointmentId = newAppointment.id.toString()

    const result = await sut.execute({
      appointmentId,
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(inMemoryAppointmentRepository.items[0]?.status).toBe('no_show')
      expect(inMemoryAppointmentRepository.items[0]?.canceledAt).toEqual(
        expect.any(Date)
      )
    }
  })
})
