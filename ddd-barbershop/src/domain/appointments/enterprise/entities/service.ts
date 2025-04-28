import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import type { ServiceCategory } from './value-objects/service-category'

export interface ServiceProps {
  name: string
  description?: string
  price: number
  category: ServiceCategory
  createdAt: Date
}

export class Service extends Entity<ServiceProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get description() {
    return this.props.description
  }

  set description(description: string | undefined) {
    this.props.description = description
  }

  get price() {
    return this.props.price
  }

  set price(price: number) {
    this.props.price = price
  }

  get category() {
    return this.props.category
  }

  set category(category: ServiceCategory) {
    this.props.category = category
  }

  get createdAt() {
    return this.props.createdAt
  }

  updatePrice(newPrice: number) {
    if (newPrice <= 0) {
      throw new Error('Price must be greater than zero.')
    }
    this.props.price = newPrice
  }

  static create(
    props: Optional<ServiceProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const service = new Service(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return service
  }
}
