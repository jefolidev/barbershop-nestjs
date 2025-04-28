import type { ClientRepository } from '@/domain/appointments/applications/repositories/client.repository'
import type { Client } from '@/domain/appointments/enterprise/entities/client'

export class InMemoryClientRepository implements ClientRepository {
  public items: Client[] = []

  async create(client: Client): Promise<void> {
    this.items.push(client)
  }
}
