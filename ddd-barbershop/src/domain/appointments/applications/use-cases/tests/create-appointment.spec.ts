import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeBarber } from '@/tests/factories/make-barber'
import { makeCategory } from '@/tests/factories/make-category'
import { makeService } from '@/tests/factories/make-service'
import { InMemoryAppointmentRepository } from '@/tests/repositories/in-memory-appointment.repository'
import { InMemoryBarberRepository } from '@/tests/repositories/in-memory-barber.repository'
import { CreateAppointmentUseCase } from '../create-appointment'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let inMemoryBarberRepository: InMemoryBarberRepository
let sut: CreateAppointmentUseCase

describe('Create Appointment', () => {
  beforeAll(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    inMemoryBarberRepository = new InMemoryBarberRepository()
    sut = new CreateAppointmentUseCase(
      inMemoryAppointmentRepository,
      inMemoryBarberRepository
    )
  })

  it('should be able to create a appointment', async () => {
    const barber = makeBarber({
      fullName: 'Jeferson Franco',
      workSchedule: [
        {
          dayOfWeek: 4,
          startTime: '02:00',
          endTime: '23:00',
        },
        {
          dayOfWeek: 1,
          startTime: '00:00',
          endTime: '23:59',
        },
      ],
    })

    await inMemoryBarberRepository.create(barber)

    const hairCategory = makeCategory({ name: 'Cabelo' })
    const beardCategory = makeCategory({ name: 'Barba' })

    const taperFade = makeService({
      name: 'Corte Americano',
      category: hairCategory,
      price: 25,
    })

    const simpleShave = makeService({
      name: 'Barba simples',
      category: beardCategory,
      price: 35,
    })

    const result = await sut.execute({
      barberId: barber.id,
      clientId: new UniqueEntityId('client-1'),
      scheduleDate: new Date(),
      services: [taperFade, simpleShave],
    })

    // console.log(result.value)
    console.log('Work schedule:', barber.workSchedule)
    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const appointment = result.value?.appointment

      expect(appointment?.paymentId).toBe(undefined)
      expect(appointment?.status).toBe('pending')
      expect(appointment?.services).toHaveLength(2)
    }
  })
})
