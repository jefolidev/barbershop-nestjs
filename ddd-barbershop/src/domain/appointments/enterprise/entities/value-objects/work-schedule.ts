interface WorkScheduleProps {
  dayOfWeek: number
  startTime: string
  endTime: string
}

export class WorkSchedule {
  public readonly dayOfWeek: number
  public readonly startTime: string
  public readonly endTime: string

  constructor({ dayOfWeek, startTime, endTime }: WorkScheduleProps) {
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
