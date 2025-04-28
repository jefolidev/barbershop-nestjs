import type { Optional } from '@/core/types/optional'

interface ServiceCategoryProps {
  name: string
  createdAt: Date
}

export class ServiceCategory {
  public readonly name: string
  public readonly createdAt: Date

  constructor({ name, createdAt }: ServiceCategoryProps) {
    this.name = name
    this.createdAt = createdAt
  }

  static create(props: Optional<ServiceCategoryProps, 'createdAt'>) {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error('Category name cannot be empty')
    }

    const serviceCategory = new ServiceCategory({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    })

    return serviceCategory
  }
}
