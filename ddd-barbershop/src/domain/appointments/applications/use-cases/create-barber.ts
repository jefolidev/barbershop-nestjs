import { Either, right } from '@/core/either'
import { Barber } from '../../enterprise/entities/barber'
import { WorkSchedule } from '../../enterprise/entities/value-objects/work-schedule'
import { BarberRepository } from '../repositories/barber.repository'

interface CreateBarberRequest {
  fullName: string
  workSchedule: WorkSchedule[]
  blockedWorkSchedule?: WorkSchedule[]
}

type CreateBarberResponse = Either<
  null,
  {
    barber: Barber
  }
>

export class CreateBarberUseCase {
  constructor(private barberRepository: BarberRepository) {}

  async execute({
    fullName,
    workSchedule,
    blockedWorkSchedule,
  }: CreateBarberRequest): Promise<CreateBarberResponse> {
    const barber = Barber.create({
      fullName,
      workSchedule,
      blockedWorkSchedule,
    })

    await this.barberRepository.create(barber)

    return right({
      barber,
    })
  }
}
