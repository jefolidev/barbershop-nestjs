import type { AppointmentRepository } from '@/domain/appointments/applications/repositories/appointment.repository'
import { Appointment } from '@/domain/appointments/enterprise/entities/appointment'

export class InMemoryAppointmentRepository implements AppointmentRepository {
  public items: Appointment[] = []

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment)
  }

  async findById(appointmentId: string) {
    const appointment = this.items.find(
      (appointment) => appointment.id.toString() === appointmentId
    )

    return appointment ?? null
  }

  async save(appointment: Appointment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === appointment.id)

    this.items[itemIndex] === appointment
  }
}
