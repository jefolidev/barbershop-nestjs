import type { UseCaseError } from './use-cases/use-case-error'

export class NoDisponibilityError extends Error implements UseCaseError {
  constructor(message: string) {
    super(message)
  }
}
