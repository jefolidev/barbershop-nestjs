import type { Appointment } from '../../enterprise/entities/appointment'

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<void>
}
