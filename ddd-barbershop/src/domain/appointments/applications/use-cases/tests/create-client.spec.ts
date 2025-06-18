import { InMemoryClientRepository } from '@/tests/repositories/in-memory-client.repository'
import { CreateClientUseCase } from '../create-client'

let inMemoryClientRepository: InMemoryClientRepository
let sut: CreateClientUseCase

describe('Create Client', () => {
  beforeEach(() => {
    inMemoryClientRepository = new InMemoryClientRepository()
    sut = new CreateClientUseCase(inMemoryClientRepository)
  })

  it('should be able to create a client', async () => {
    const result = await sut.execute({
      fullName: 'Jeferson Franco de Oliveira',
    })

    expect(result.value?.client.fullName).toBe('Jeferson Franco de Oliveira')
    expect(result.isRight()).toBe(true)
  })
})
