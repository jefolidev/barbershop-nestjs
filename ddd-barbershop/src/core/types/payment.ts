export enum PAYMENT_METHOD {
  DEBIT = 'debit_card',
  CREDIT = 'credit_card',
  PIX = 'pix',
  CASH = 'cash',
}

export enum PAYMENT_MODALITY {
  IN_APP = 'in_app',
  IN_PERSON = 'in_person',
}

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
