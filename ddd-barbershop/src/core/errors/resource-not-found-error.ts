import type { UseCaseError } from './use-cases/use-case-error'

export class NotFoundError extends Error implements UseCaseError {
  constructor(message = 'Resourece not founded.') {
    super(message)
  }
}
