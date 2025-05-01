import type { Appointment } from '../../enterprise/entities/appointment'

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<void>
  findById(appointmentId: string): Promise<Appointment | null>
  save(appointment: Appointment): Promise<void>
}
