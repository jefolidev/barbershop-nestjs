import type { Client } from '../../enterprise/entities/client'

export interface ClientRepository {
  create(client: Client): Promise<void>
  findById(clientId: string): Promise<Client | null>
}
