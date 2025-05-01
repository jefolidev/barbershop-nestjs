import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Barber } from '@/domain/appointments/enterprise/entities/barber'

export function makeBarber(override: Partial<Barber> = {}) {
  return Barber.create(
    {
      fullName: 'John Doe',
      workSchedule: [
        {
          dayOfWeek: 1,
          startTime: '09:00',
          endTime: '18:00',
        },
      ],
      ...override,
    },
    override?.id ?? new UniqueEntityId()
  )
}
