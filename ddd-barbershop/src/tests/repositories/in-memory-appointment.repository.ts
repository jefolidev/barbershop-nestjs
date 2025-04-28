import type { AppointmentRepository } from '@/domain/appointments/applications/repositories/appointment.repository'
import type { Appointment } from '@/domain/appointments/enterprise/entities/appointment'

export class InMemoryAppointmentRepository implements AppointmentRepository {
  public items: Appointment[] = []

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment)
  }
}
