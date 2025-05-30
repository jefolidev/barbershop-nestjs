import { DomainEvents } from '@/core/events/domain-events'
import type { EventHandler } from '@/core/events/event-handler'
import type { BarberRepository } from '@/domain/appointments/applications/repositories/barber.repository'
import type { ClientRepository } from '@/domain/appointments/applications/repositories/client.repository'
import { AppointmentUpdatedEvent } from '@/domain/appointments/enterprise/events/appointment-updated-event'
import type { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnAppointmentUpdated implements EventHandler {
  constructor(
    private barberRepository: BarberRepository,
    private clientRepository: ClientRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendUpdatedAppointmentNotification.bind(this),
      AppointmentUpdatedEvent.name
    )
  }

  private async sendUpdatedAppointmentNotification({
    appointment,
  }: AppointmentUpdatedEvent) {
    const barber = await this.barberRepository.findById(
      appointment.barberId.toString()
    )

    const client = await this.clientRepository.findById(
      appointment.clientId.toString()
    )

    if (barber && client) {
      await this.sendNotification.execute({
        recipientId: barber.id.toString(),
        title: `${client.fullName} alterou o agendamento.`,
        content: `Informações do agendamento foram alteradas, clique para ver mais.`,
      })
    }
  }
}
