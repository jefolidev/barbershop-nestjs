import type { Barber } from '../../enterprise/entities/barber'

export interface BarberRepository {
  create(barber: Barber): Promise<void>
  findById(appointmentId: string): Promise<Barber | null>
}
