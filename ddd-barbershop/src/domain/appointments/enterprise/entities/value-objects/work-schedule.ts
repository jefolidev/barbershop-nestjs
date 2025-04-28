interface WorkScheduleProps {
  dayOfWeek: number
  startTime: string
  endTime: string
}

export class WorkSchedule {
  public readonly dayOfWeek: number
  public readonly startTime: string
  public readonly endTime: string

  validateTimeFormat(time: string) {
    const regex = /^([0-9]{2}):([0-9]{2})$/
    return regex.test(time)
  }

  constructor({ dayOfWeek, startTime, endTime }: WorkScheduleProps) {
    if (
      !this.validateTimeFormat(startTime) ||
      !this.validateTimeFormat(endTime)
    ) {
      throw new Error('Invalid time format')
    }

    this.dayOfWeek = dayOfWeek
    this.startTime = startTime
    this.endTime = endTime

    if (startTime >= endTime) {
      throw new Error('Start time must be before end time')
    }
  }

  static create(props: WorkScheduleProps) {
    const workSchedule = new WorkSchedule({
      ...props,
    })

    return workSchedule
  }
}
