import type { BarberRepository } from '@/domain/appointments/applications/repositories/barber.repository'
import type { Barber } from '@/domain/appointments/enterprise/entities/barber'

export class InMemoryBarberRepository implements BarberRepository {
  public items: Barber[] = []

  async create(barber: Barber): Promise<void> {
    this.items.push(barber)
  }
}
