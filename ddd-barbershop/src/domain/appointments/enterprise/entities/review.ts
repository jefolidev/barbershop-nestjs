import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import type { Rating } from '@/core/types/rating'

export interface ReviewProps {
  clientId: UniqueEntityId
  barberId: UniqueEntityId
  rating: Rating
  comment?: string
  createdAt: Date
}

export class Review extends Entity<ReviewProps> {
  get clientId() {
    return this.props.clientId
  }

  get barberId() {
    return this.props.barberId
  }

  get rating() {
    return this.props.rating
  }

  get createdAt() {
    return this.props.createdAt
  }

  set rating(rating: Rating) {
    this.props.rating = rating
  }

  static create(
    props: Optional<ReviewProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const review = new Review(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return review
  }
}
