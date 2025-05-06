import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import { Rating } from '@/core/types/rating'
import { Review } from './review'

export interface ClientProps {
  fullName: string
  rating: Rating
  reviews: Review[]
}

export class Client extends Entity<ClientProps> {
  get fullName() {
    return this.props.fullName
  }

  set fullName(fullName: string) {
    this.props.fullName = fullName
  }

  get rating(): Rating {
    return this.props.rating
  }

  set rating(rating: Rating) {
    this.props.rating = rating
  }

  get reviews(): Review[] {
    return this.props.reviews ?? []
  }

  set reviews(reviews: Review[]) {
    this.props.reviews = reviews
  }

  static create(
    props: Optional<ClientProps, 'rating' | 'reviews'>,
    id?: UniqueEntityId
  ) {
    const client = new Client(
      {
        ...props,
        rating: props.rating ?? 0,
        reviews: props.reviews ?? [],
      },
      id
    )

    return client
  }
}
