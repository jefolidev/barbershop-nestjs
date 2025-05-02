import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Client } from '@/domain/appointments/enterprise/entities/client'

export function makeClient(override: Partial<Client> = {}) {
  return Client.create(
    {
      fullName: 'John Doe',
      ...override,
    },
    override?.id ?? new UniqueEntityId()
  )
}
