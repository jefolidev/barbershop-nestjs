import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Barber } from '@/domain/appointments/enterprise/entities/barber'

export function makeBarber(override: Partial<Barber> = {}) {
  return Barber.create(
    {
      fullName: 'John Doe',
      workSchedule: [
        {
          dayOfWeek: 0,
          startTime: '00:00',
          endTime: '23:59',
        },
        {
          dayOfWeek: 1,
          startTime: '00:00',
          endTime: '23:59',
        },
        {
          dayOfWeek: 2,
          startTime: '00:00',
          endTime: '23:59',
        },
        {
          dayOfWeek: 3,
          startTime: '00:00',
          endTime: '23:59',
        },
        {
          dayOfWeek: 4,
          startTime: '00:00',
          endTime: '23:59',
        },
        {
          dayOfWeek: 5,
          startTime: '00:00',
          endTime: '23:59',
        },
        {
          dayOfWeek: 6,
          startTime: '09:00',
          endTime: '23:59',
        },
      ],
      ...override,
    },
    override?.id ?? new UniqueEntityId()
  )
}
