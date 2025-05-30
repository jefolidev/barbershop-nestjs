import { DomainEvents } from '@/core/events/domain-events'
import type { EventHandler } from '@/core/events/event-handler'
import type { BarberRepository } from '@/domain/appointments/applications/repositories/barber.repository'
import type { ClientRepository } from '@/domain/appointments/applications/repositories/client.repository'
import { AppointmentCanceledByBarberEvent } from '@/domain/appointments/enterprise/events/appointment-canceled-event-by-barber'
import { AppointmentCanceledByClientEvent } from '@/domain/appointments/enterprise/events/appointment-canceled-event-by-client'
import type { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnAppointmentCanceled implements EventHandler {
  constructor(
    private barberRepository: BarberRepository,
    private clientRepository: ClientRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendCanceledAppointmentByClientNotification.bind(this),
      AppointmentCanceledByClientEvent.name
    )
    DomainEvents.register(
      this.sendCanceledAppointmentByBarberNotification.bind(this),
      AppointmentCanceledByBarberEvent.name
    )
  }

  private async sendCanceledAppointmentByClientNotification({
    appointment,
  }: AppointmentCanceledByClientEvent) {
    const barber = await this.barberRepository.findById(
      appointment.barberId.toString()
    )

    const client = await this.clientRepository.findById(
      appointment.clientId.toString()
    )

    if (barber && client) {
      await this.sendNotification.execute({
        recipientId: barber.id.toString(),
        title: `${client.fullName} cancelou o agendamento`,
        content: `O horário cancelado está disponível agora.`,
      })
    }
  }

  private async sendCanceledAppointmentByBarberNotification({
    appointment,
    reason,
  }: AppointmentCanceledByBarberEvent) {
    const barber = await this.barberRepository.findById(
      appointment.barberId.toString()
    )

    const client = await this.clientRepository.findById(
      appointment.clientId.toString()
    )

    if (barber && client) {
      await this.sendNotification.execute({
        recipientId: barber.id.toString(),
        title: `${barber.fullName} cancelou o agendamento`,
        content: `Acesse o aplicativo agora para reagender. Motivo: ${reason}`,
      })
    }
  }
}
