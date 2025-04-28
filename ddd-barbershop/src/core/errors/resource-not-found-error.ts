import type { UseCaseError } from './use-cases/use-case-error'

export class NotFoundedError extends Error implements UseCaseError {
  constructor() {
    super('Resource new NotFoundedError.')
  }
}
