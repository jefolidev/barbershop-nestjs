import type { Service } from '../../enterprise/entities/service'

export interface ServiceRepository {
  create(service: Service): Promise<void>
}
