import type { UseCaseError } from './use-cases/use-case-error'

export class NotAllowedError extends Error implements UseCaseError {
  constructor() {
    super('new NotAllowedError')
  }
}
