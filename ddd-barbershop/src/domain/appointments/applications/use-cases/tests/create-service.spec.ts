import { ServiceCategory } from '@/domain/appointments/enterprise/entities/value-objects/service-category'
import { InMemoryServiceRepository } from '@/tests/repositories/in-memory-service.repository'
import { CreateServiceUseCase } from '../create-service'

let inMemoryServiceRepository: InMemoryServiceRepository
let sut: CreateServiceUseCase

describe('Create Service', () => {
  beforeAll(() => {
    inMemoryServiceRepository = new InMemoryServiceRepository()
    sut = new CreateServiceUseCase(inMemoryServiceRepository)
  })

  it('should be able to create a service', async () => {
    const category = ServiceCategory.create({
      name: 'Cabelo',
    })

    const result = await sut.execute({
      name: 'Corte Americano',
      category,
      description:
        'Corte tradicional americano (taper fade). Com disfarce baixo, medio e alto.',
      price: 25,
    })

    expect(result.isRight()).toBe(true)
  })
})
