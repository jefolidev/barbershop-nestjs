import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import { Rating } from '@/core/types/rating'
import type { Payment } from '../../../payments/enterprise/entities/payment'
import { Appointment } from './appointment'
import { Review } from './review'

export interface ClientProps {
  fullName: string
  rating: Rating
  reviews: Review[]
  upcomingAppointments: Appointment[]
  pastAppointments: Appointment[]
  paymentHistory: Payment[]
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

  get upcomingAppointments(): Appointment[] {
    return this.props.upcomingAppointments
  }

  set upcomingAppointments(upcomingAppointments: Appointment[]) {
    this.props.upcomingAppointments = upcomingAppointments
  }

  get pastAppointments(): Appointment[] {
    return this.props.pastAppointments
  }

  set pastAppointments(pastAppointments: Appointment[]) {
    this.props.pastAppointments = pastAppointments
  }

  get paymentHistory(): Payment[] {
    return this.props.paymentHistory
  }

  set paymentHistory(paymentHistory: Payment[]) {
    this.props.paymentHistory = paymentHistory
  }

  hasAppointments() {
    return (this.props.upcomingAppointments?.length ?? 0) > 0
  }

  hasPastAppointments() {
    return (this.props.pastAppointments?.length ?? 0) > 0
  }

  static create(
    props: Optional<
      ClientProps,
      | 'rating'
      | 'reviews'
      | 'upcomingAppointments'
      | 'pastAppointments'
      | 'paymentHistory'
    >,
    id?: UniqueEntityId
  ) {
    const client = new Client(
      {
        ...props,
        rating: props.rating ?? 0,
        reviews: props.reviews ?? [],
        upcomingAppointments: props.upcomingAppointments ?? [],
        pastAppointments: props.pastAppointments ?? [],
        paymentHistory: props.paymentHistory ?? [],
      },
      id
    )

    return client
  }
}
