import { left, right, type Either } from '@/core/either'
import { NotFoundError } from '@/core/errors/resource-not-found-error'
import type { WorkSchedule } from '../../enterprise/entities/value-objects/work-schedule'
import type { BarberRepository } from '../repositories/barber.repository'

interface FetchBarberAvailableHoursUseCaseRequest {
  barberId: string
}

type FetchBarberAvailableHoursUseCaseResponse = Either<
  NotFoundError,
  {
    barberTimes: WorkSchedule[]
  }
>

export class FetchBarberAvailableHoursUseCase {
  constructor(private barberRepository: BarberRepository) {}

  async execute({
    barberId,
  }: FetchBarberAvailableHoursUseCaseRequest): Promise<FetchBarberAvailableHoursUseCaseResponse> {
    const barber = await this.barberRepository.findById(barberId)

    if (!barber) {
      return left(new NotFoundError())
    }

    return right({
      barberTimes: barber?.workSchedule,
    })
  }
}
