import { DomainEvents } from '@/core/events/domain-events'
import type { EventHandler } from '@/core/events/event-handler'
import type { AppointmentRepository } from '@/domain/appointments/applications/repositories/appointment.repository'
import { PaymentSuccessEvent } from '@/domain/appointments/enterprise/events/payment-success-event'
import type { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnPaymentSuccess implements EventHandler {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendPaymentSuccessPaymentToBarber.bind(this),
      PaymentSuccessEvent.name
    )

    DomainEvents.register(
      this.sendPaymentSuccessPaymentToClient.bind(this),
      PaymentSuccessEvent.name
    )
  }

  private async sendPaymentSuccessPaymentToBarber({
    payment,
  }: PaymentSuccessEvent) {
    const appointmentId = payment.appointmentId
    const appointment = await this.appointmentRepository.findById(
      appointmentId.toString()
    )

    if (appointment) {
      const barberId = appointment?.barberId

      const appointmentAmount = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(payment.amount)

      await this.sendNotification.execute({
        recipientId: barberId.toString(),
        title: 'Pagamento do cliente realizado com sucesso.',
        content: `O valor de ${appointmentAmount} foi pago no ${payment.method}.`,
      })
    }
  }

  private async sendPaymentSuccessPaymentToClient({
    payment,
  }: PaymentSuccessEvent) {
    const appointmentId = payment.appointmentId
    const appointment = await this.appointmentRepository.findById(
      appointmentId.toString()
    )

    if (appointment) {
      const clientId = appointment?.clientId

      const appointmentAmount = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(payment.amount)

      await this.sendNotification.execute({
        recipientId: clientId.toString(),
        title: 'Pagamento realizado com sucesso!',
        content: `O valor de ${appointmentAmount} foi pago no ${payment.method}.`,
      })
    }
  }
}
