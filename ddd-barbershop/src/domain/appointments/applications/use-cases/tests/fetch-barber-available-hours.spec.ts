import { Barber } from '@/domain/appointments/enterprise/entities/barber'
import { InMemoryBarberRepository } from '@/tests/repositories/in-memory-barber.repository'
import { FetchBarberAvailableHoursUseCase } from '../fetch-barber-available-hours'

let inMemoryBarberRepository: InMemoryBarberRepository
let sut: FetchBarberAvailableHoursUseCase

describe('Fetch Barber Available Hours', () => {
  beforeAll(() => {
    inMemoryBarberRepository = new InMemoryBarberRepository()
    sut = new FetchBarberAvailableHoursUseCase(inMemoryBarberRepository)
  })

  it('should fetch the barber work times', async () => {
    const barber = Barber.create({
      fullName: 'John Doe',
      workSchedule: [
        {
          dayOfWeek: 2,
          startTime: '08:00',
          endTime: '20:00',
        },
        {
          dayOfWeek: 3,
          startTime: '08:00',
          endTime: '20:00',
        },
      ],
    })

    inMemoryBarberRepository.create(barber)

    const result = await sut.execute({
      barberId: barber.id.toString(),
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const barberTimes = result.value.barberTimes
      expect(barberTimes).toMatchObject(barber.workSchedule)
    }
  })

  it('should return an error if ther barber is not found', async () => {
    const result = await sut.execute({
      barberId: 'non-existent-id',
    })

    expect(result.isLeft()).toBe(true)
  })
})
