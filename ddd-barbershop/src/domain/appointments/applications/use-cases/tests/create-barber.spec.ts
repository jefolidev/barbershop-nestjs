import { InMemoryBarberRepository } from '@/tests/repositories/in-memory-barber.repository'
import { CreateBarberUseCase } from '../create-barber'

let inMemoryBarberRepository: InMemoryBarberRepository
let sut: CreateBarberUseCase

describe('Create Barber', () => {
  beforeEach(() => {
    inMemoryBarberRepository = new InMemoryBarberRepository()
    sut = new CreateBarberUseCase(inMemoryBarberRepository)
  })

  it('should be able to create a barber', async () => {
    const result = await sut.execute({
      fullName: 'Jeferson Franco de Oliveira',
      workSchedule: [{ dayOfWeek: 1, startTime: '10:00', endTime: '18:00' }],
    })

    expect(result.value?.barber.fullName).toBe('Jeferson Franco de Oliveira')
    expect(result.isRight()).toBe(true)
  })
})
