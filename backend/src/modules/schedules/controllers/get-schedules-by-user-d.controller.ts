import { Controller, Get, Param } from '@nestjs/common'
import { ScheduleService } from '../schedules.service'

@Controller('schedules')
export class GetScheduleByUserIdController {
	constructor(private schedule: ScheduleService) {}

	@Get(':_userId')
	async findAll(@Param('_userId') userId: string) {
		return this.schedule.findScheduleByUserId(userId)
	}
}
