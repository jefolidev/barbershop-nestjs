import { Either, right } from '@/core/either'
import { Client } from '../../enterprise/entities/client'
import { ClientRepository } from '../repositories/client.repository'

interface CreateClientRequest {
  fullName: string
}

type CreateClientResponse = Either<
  null,
  {
    client: Client
  }
>

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    fullName,
  }: CreateClientRequest): Promise<CreateClientResponse> {
    const client = Client.create({
      fullName,
    })

    await this.clientRepository.create(client)

    return right({
      client,
    })
  }
}
