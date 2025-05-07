import { BadRequestError } from '@/core/errors/bad-request-error'
import { makeAppointment } from '@/tests/factories/make-appointment'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { FinishAnAppointmentUseCase } from '../finish-an-appointment'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: FinishAnAppointmentUseCase

describe('Cancel a Appointment', () => {
  beforeAll(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new FinishAnAppointmentUseCase(inMemoryAppointmentRepository)
  })

  it('should be possible to cancel a appointment', async () => {
    const appointment = makeAppointment()

    await inMemoryAppointmentRepository.create(appointment)

    const result = await sut.execute({
      appointmentId: appointment.id.toString(),
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const appointment = result.value.appointment

      expect(appointment.status).toBe('completed')
    }
  })

  it('should return an error if the appointment is not pending', async () => {
    const appointment = makeAppointment({
      status: 'completed',
    })

    await inMemoryAppointmentRepository.create(appointment)

    const result = await sut.execute({
      appointmentId: appointment.id.toString(),
    })

    expect(result.isLeft()).toBe(true)

    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(BadRequestError)
      expect(result.value.message).toBe(
        'Error: Only pending appointments can be completed.'
      )
    }
  })

  it('should return an error if the appointment is not found', async () => {
    const result = await sut.execute({
      appointmentId: 'non-existent-id',
    })

    expect(result.isLeft()).toBe(true)
  })
})
