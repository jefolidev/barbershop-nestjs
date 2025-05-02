interface WorkScheduleProps {
  dayOfWeek: number
  startTime: string
  endTime: string
}

export class WorkSchedule {
  public readonly dayOfWeek: number
  public readonly startTime?: string
  public readonly endTime?: string

  constructor({
    dayOfWeek,
    startTime = '00:00',
    endTime = '23:59',
  }: WorkScheduleProps) {
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
      startTime: props.startTime ?? '00:00',
      endTime: props.endTime ?? '23:59',
    })

    return workSchedule
  }
}
