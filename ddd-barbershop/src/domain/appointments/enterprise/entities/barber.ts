import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/types/optional'
import { Rating } from '@/core/types/rating'
import type { Appointment } from './appointment'
import { Review } from './review'
import type { WorkSchedule } from './value-objects/work-schedule'

export interface BarberProps {
  fullName: string
  rating: Rating
  reviews: Review[]
  workSchedule: WorkSchedule[]
  blockedWorkSchedule: WorkSchedule[]
  upcomingAppointments: Appointment[]
}

export class Barber extends Entity<BarberProps> {
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

  get workSchedule(): WorkSchedule[] {
    return this.props.workSchedule
  }

  set workSchedule(workSchedule: WorkSchedule[]) {
    this.props.workSchedule = workSchedule
  }

  get blockedWorkSchedule(): WorkSchedule[] {
    return this.props.blockedWorkSchedule ?? []
  }

  set blockedWorkSchedule(blockedWorkSchedule: WorkSchedule[]) {
    this.props.blockedWorkSchedule = blockedWorkSchedule
  }

  get upcomingAppointments(): Appointment[] {
    return this.props.upcomingAppointments
  }

  set upcomingAppointments(upcomingAppointments: Appointment[]) {
    this.props.upcomingAppointments = upcomingAppointments
  }

  static create(
    props: Optional<
      BarberProps,
      'rating' | 'blockedWorkSchedule' | 'reviews' | 'upcomingAppointments'
    >,
    id?: UniqueEntityId
  ) {
    const barber = new Barber(
      {
        ...props,
        rating: props.rating ?? 0,
        reviews: props.reviews ?? [],
        upcomingAppointments: props.upcomingAppointments ?? [],
        blockedWorkSchedule: props.blockedWorkSchedule ?? [],
      },
      id
    )

    return barber
  }
}
