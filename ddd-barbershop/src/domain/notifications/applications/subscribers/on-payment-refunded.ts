import { NotFoundError } from '@/core/errors/resource-not-found-error'
import { DomainEvents } from '@/core/events/domain-events'
import type { EventHandler } from '@/core/events/event-handler'
import type { AppointmentRepository } from '@/domain/appointments/applications/repositories/appointment.repository'
import type { ClientRepository } from '@/domain/appointments/applications/repositories/client.repository'
import { PaymentRefundedEvent } from '@/domain/appointments/enterprise/events/payment-refunded.'
import type { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnAppointmentRefunded implements EventHandler {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private clientRepository: ClientRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendRefundedNotification.bind(this),
      PaymentRefundedEvent.name
    )
  }

  private async sendRefundedNotification({ payment }: PaymentRefundedEvent) {
    const appointment = await this.appointmentRepository.findById(
      payment.appointmentId.toString()
    )

    if (!appointment) {
      return new NotFoundError('Appointment not founded.')
    }

    const client = await this.clientRepository.findById(
      appointment.clientId.toString()
    )

    if (client) {
      await this.sendNotification.execute({
        recipientId: client.id.toString(),
        title: 'Pagamento estornado',
        content: `${client.fullName} seu pagamento no valor de R$${payment.amount} foi extornado.`,
      })
    }
  }
}
