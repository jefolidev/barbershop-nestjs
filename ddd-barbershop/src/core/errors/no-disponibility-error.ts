import type { UseCaseError } from './use-cases/use-case-error'

export class NoDisponibilityError extends Error implements UseCaseError {
  constructor() {
    super('The selected date/time is not available for this barber.')
  }
}
