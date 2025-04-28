import { right, type Either } from '@/core/either'
import { Service } from '../../enterprise/entities/service'
import type { ServiceCategory } from '../../enterprise/entities/value-objects/service-category'
import type { ServiceRepository } from '../repositories/service.repository'

interface CreateServiceRequest {
  name: string
  description: string
  price: number
  category: ServiceCategory
}

type CreateServiceResponse = Either<
  null,
  {
    service: Service
  }
>

export class CreateServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute({
    name,
    description,
    category,
    price,
  }: CreateServiceRequest): Promise<CreateServiceResponse> {
    const service = Service.create({
      name,
      description,
      category,
      price,
    })

    await this.serviceRepository.create(service)

    return right({
      service,
    })
  }
}
