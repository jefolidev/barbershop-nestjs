import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Appointment } from '@/domain/appointments/enterprise/entities/appointment'
import { makeCategory } from '@/tests/factories/make-category'
import { makeService } from '@/tests/factories/make-service'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { CancelAppointmentUseCase } from '../cancel-appointment'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: CancelAppointmentUseCase

describe('Cancel a Appointment', () => {
  beforeAll(() => {
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

  it('should return an error if the appointment is not found', async () => {
    const result = await sut.execute({
      appointmentId: 'non-existent-id',
    })

    expect(result.isLeft()).toBe(true)
  })
})
