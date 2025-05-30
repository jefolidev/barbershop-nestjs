import { DomainEvents } from '@/core/events/domain-events'
import type { EventHandler } from '@/core/events/event-handler'
import type { BarberRepository } from '@/domain/appointments/applications/repositories/barber.repository'
import type { ClientRepository } from '@/domain/appointments/applications/repositories/client.repository'
import { AppointmentReminderEvent } from '@/domain/appointments/enterprise/events/appointment-reminder-event'
import dayjs from 'dayjs'
import type { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnAppointmentReminder implements EventHandler {
  constructor(
    private barberRepository: BarberRepository,
    private clientRepository: ClientRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendRemindAppointmentNotification.bind(this),
      AppointmentReminderEvent.name
    )
  }

  private async sendRemindAppointmentNotification({
    appointment,
    remindAt,
  }: AppointmentReminderEvent) {
    const now = dayjs()
    const reminder = dayjs(remindAt)

    const barber = await this.barberRepository.findById(
      appointment.barberId.toString()
    )

    const client = await this.clientRepository.findById(
      appointment.clientId.toString()
    )

    if (barber && client) {
      if (now.isAfter(reminder.subtract(5, 'minutes')))
        await this.sendNotification.execute({
          recipientId: barber.id.toString(),
          title: 'Atendimento daqui a 30 minutos!',
          content: `Não esqueça do seu corte com ${client?.fullName}.`,
        })
    }
  }
}
