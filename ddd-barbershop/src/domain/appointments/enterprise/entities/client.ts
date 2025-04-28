import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { Rating } from '@/core/types/ratung'
import type { Review } from './review'

export interface ClientProps {
  id: UniqueEntityId
  fullName: string
  rating?: Rating
  reviews: Review[]
  upcomingAppointments: Appointment[]
  pastAppointments: Appointment[]
  paymentHistory: Payment[]
  notifications: Notification[]
}

export class Client extends Entity<ClientProps> {}
