import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Service } from '@/domain/appointments/enterprise/entities/service'
import { ServiceCategory } from '@/domain/appointments/enterprise/entities/value-objects/service-category'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { CreateAppointmentUseCase } from '../create-appointment'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: CreateAppointmentUseCase

describe('Create Appointment', () => {
  beforeAll(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new CreateAppointmentUseCase(inMemoryAppointmentRepository)
  })

  it('should be able to create a appointment', async () => {
    const hairCategory = ServiceCategory.create({
      name: 'Cabelo',
    })

    const beardCategory = ServiceCategory.create({
      name: 'barba',
    })

    const taperFade = Service.create({
      name: 'Corte Americano',
      category: hairCategory,
      description:
        'Corte tradicional americano (taper fade). Com disfarce baixo, medio e alto.',
      price: 25,
    })

    const simpleShave = Service.create({
      name: 'Barba simples',
      category: beardCategory,
      price: 35,
    })

    const result = await sut.execute({
      barberId: new UniqueEntityId('barber-1'),
      clientId: new UniqueEntityId('client-1'),
      scheduleDate: new Date('03/05/2025'),
      services: [taperFade, simpleShave],
    })

    const appointment = result.value?.appointment

    expect(result.isRight()).toBe(true)
    expect(appointment?.paymentId).toBe(undefined)
    expect(appointment?.status).toBe('pending')
  })
})
