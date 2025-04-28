import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Rating } from '@/core/types/ratung'
import { Appointment } from './appointment'
import type { Payment } from './payment'
import { Review } from './review'

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
