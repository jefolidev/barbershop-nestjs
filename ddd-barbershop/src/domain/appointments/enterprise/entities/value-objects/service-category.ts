import type { Optional } from '@/core/types/optional'

interface ServiceCategoryProps {
  name: string
  createdAt: Date
}

export class ServiceCategory {
  public name: string
  public createdAt: Date

  constructor({ name, createdAt }: ServiceCategoryProps) {
    this.name = name
    this.createdAt = createdAt
  }

  static create(props: Optional<ServiceCategoryProps, 'createdAt'>) {
    const serviceCategory = new ServiceCategory({
      ...props,
      createdAt: new Date(),
    })

    return serviceCategory
  }
}
