import { left, right, type Either } from '@/core/either'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { BadRequestError } from '@/core/errors/bad-request-error'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import { PAYMENT_METHOD, PAYMENT_MODALITY } from '@/core/types/payment'
import type { AppointmentRepository } from '@/domain/appointments/applications/repositories/appointment.repository'
import { Payment } from '../../enterprise/entities/payment'
import type { PaymentRepository } from '../repositories/payment.repository'

interface CreatePaymentUseCaseRequest {
  appointmentId: UniqueEntityId
  modality: PAYMENT_MODALITY
  method: PAYMENT_METHOD
}

type CreatePaymentUseCaseResponse = Either<
  NotFoundError,
  {
    payment: Payment
  }
>

export class CreatePaymentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private paymentRepository: PaymentRepository
  ) {}

  async execute({
    appointmentId,
    method,
    modality,
  }: CreatePaymentUseCaseRequest): Promise<CreatePaymentUseCaseResponse> {
    const appointmentOfCurrentPayment =
      await this.appointmentRepository.findById(appointmentId.toString())

    if (!appointmentOfCurrentPayment) {
      return left(new NotFoundError('Appointment not found.'))
    }

    const servicesOfAppointment = appointmentOfCurrentPayment.services

    if (!servicesOfAppointment.length) {
      return left(new BadRequestError('Appointment has no services.'))
    }

    const payment = Payment.create({
      appointmentId,
      method,
      modality,
      amount: appointmentOfCurrentPayment.totalPrice,
      status: modality === PAYMENT_MODALITY.IN_APP ? 'paid' : 'pending',
      paidAt: modality === PAYMENT_MODALITY.IN_APP ? new Date() : undefined,
    })

    await this.paymentRepository.create(payment)

    payment.isPaid = payment.status === 'paid' ? true : false

    appointmentOfCurrentPayment.paymentId = payment.id
    await this.appointmentRepository.save(appointmentOfCurrentPayment)

    return right({
      payment,
    })
  }
}
