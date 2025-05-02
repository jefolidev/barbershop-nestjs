import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Service } from '@/domain/appointments/enterprise/entities/service'
import { makeCategory } from './make-category'

export function makeService(override?: Partial<Service>, id?: UniqueEntityId) {
  const haircutCategory = makeCategory()

  return Service.create(
    {
      name: 'Default Service',
      category: haircutCategory,
      price: 45,
      description: 'Default Description',
      ...override,
    },
    id
  )
}
