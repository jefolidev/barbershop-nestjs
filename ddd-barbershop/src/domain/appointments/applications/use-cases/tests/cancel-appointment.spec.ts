import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { BadRequestError } from '@/core/errors/bad-request-error'
import { Appointment } from '@/domain/appointments/enterprise/entities/appointment'
import { makeAppointment } from '@/tests/factories/make-appointment'
import { makeCategory } from '@/tests/factories/make-category'
import { makeService } from '@/tests/factories/make-service'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { CancelAppointmentUseCase } from '../cancel-appointment'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: CancelAppointmentUseCase

describe('Cancel a Appointment', () => {
  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new CancelAppointmentUseCase(inMemoryAppointmentRepository)
  })

  it('should be possible to cancel a appointment', async () => {
    const hairCategory = makeCategory({ name: 'Cabelo' })

    const taperFade = makeService({
      name: 'Corte Americano',
      category: hairCategory,
      price: 25,
    })

    const newAppointment = Appointment.create({
      barberId: new UniqueEntityId('barber-1'),
      clientId: new UniqueEntityId('client-1'),
      scheduleDate: new Date('03/05/2025'),
      services: [taperFade],
    })

    await inMemoryAppointmentRepository.create(newAppointment)

    const appointmentId = newAppointment.id.toString()

    const result = await sut.execute({ appointmentId })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const appointment = result.value.appointment

      expect(appointment.status).toBe('cancelled')
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
        'Error: Only pending appointments can be canceled.'
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
