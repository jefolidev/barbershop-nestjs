import { DomainEvents } from '@/core/events/domain-events'
import type { EventHandler } from '@/core/events/event-handler'
import type { BarberRepository } from '@/domain/appointments/applications/repositories/barber.repository'
import type { ClientRepository } from '@/domain/appointments/applications/repositories/client.repository'
import { AppointmentCreatedEvent } from '@/domain/appointments/enterprise/events/appointment-created-event'
import type { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnAppointmentCreated implements EventHandler {
  constructor(
    private barberRepository: BarberRepository,
    private clientRepository: ClientRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAppointmentNotification.bind(this),
      AppointmentCreatedEvent.name
    )
  }

  private async sendNewAppointmentNotification({
    appointment,
  }: AppointmentCreatedEvent) {
    const barber = await this.barberRepository.findById(
      appointment.barberId.toString()
    )

    const client = await this.clientRepository.findById(
      appointment.clientId.toString()
    )

    if (barber && client) {
      await this.sendNotification.execute({
        recipientId: barber.id.toString(),
        title: 'Novo agendamento criado.',
        content: `${client.fullName} criou um agendamento para ${appointment.scheduleDate.toDateString()}.`,
      })
    }
  }
}
