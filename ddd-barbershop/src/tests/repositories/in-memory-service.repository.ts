import type { ServiceRepository } from '@/domain/appointments/applications/repositories/service.repository'
import type { Service } from '@/domain/appointments/enterprise/entities/service'

export class InMemoryServiceRepository implements ServiceRepository {
  public items: Service[] = []

  async create(service: Service): Promise<void> {
    this.items.push(service)
  }
}
