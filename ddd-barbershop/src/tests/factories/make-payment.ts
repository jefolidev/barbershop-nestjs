import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PAYMENT_METHOD, PAYMENT_MODALITY } from '@/core/types/payment'
import {
  Payment,
  PaymentProps,
} from '@/domain/payments/enterprise/entities/payment'
import { makeAppointment } from './make-appointment'

type Override = Partial<PaymentProps>

export function makePayment(override: Override = {}, id?: UniqueEntityId) {
  const appointment = makeAppointment()

  return Payment.create(
    {
      appointmentId: appointment.id,
      method: PAYMENT_METHOD.DEBIT,
      modality: PAYMENT_MODALITY.IN_APP,
      amount: 50,
      ...override,
    },
    id
  )
}
