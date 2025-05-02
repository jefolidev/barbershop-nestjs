import type { ClientRepository } from '@/domain/appointments/applications/repositories/client.repository'
import type { Client } from '@/domain/appointments/enterprise/entities/client'

export class InMemoryClientRepository implements ClientRepository {
  public items: Client[] = []

  async create(client: Client): Promise<void> {
    this.items.push(client)
  }

  async findById(clientId: string) {
    const client = this.items.find(
      (client) => client.id.toString() === clientId
    )

    return client ?? null
  }
}
