import type { Appointment } from '../../enterprise/entities/appointment'

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<void>
  findManyById(appointmentId: string): Promise<Appointment | null>
  findManyByBarberId(barberId: string): Promise<Appointment[]>
  findManyByClientId(clientId: string): Promise<Appointment[]>
  save(appointment: Appointment): Promise<void>
}
