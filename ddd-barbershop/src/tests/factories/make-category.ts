import { ServiceCategory } from '@/domain/appointments/enterprise/entities/value-objects/service-category'

export function makeCategory(override?: Partial<ServiceCategory>) {
  return ServiceCategory.create({
    name: 'Default Service Category',
    ...override,
  })
}
