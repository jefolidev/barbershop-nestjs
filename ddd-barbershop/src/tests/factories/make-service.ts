import { Service } from '@/domain/appointments/enterprise/entities/service'
import { makeCategory } from './make-category'

export function makeService(override?: Partial<Service>) {
  const haircutCategory = makeCategory()

  return Service.create({
    name: 'Default Service',
    category: haircutCategory,
    price: 45,
    description: 'Default Description',
    ...override,
  })
}
