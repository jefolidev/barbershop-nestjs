import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { UsersService } from 'src/modules/users/users.service'
import { ScheduleService } from '../schedules.service'

@Controller('schedules')
export class GetScheduleByUserIdController {
	constructor(
		private schedule: ScheduleService,
		private user: UsersService,
	) {}

	@Get('user/:_userId')
	async findAll(@Param('_userId') userId: string) {
		if (!userId) {
			throw new NotFoundException(
				'User id not provided, please, insert the barber Id.',
				'User id is null or undefined.',
			)
		}

		const hasUserWithUserId = await this.user.findUserById(userId)

		if (!hasUserWithUserId) {
			throw new NotFoundException(
				'User id not founded, please, try other id.',
				'User id not not exists.',
			)
		}
		return this.schedule.findScheduleByUserId(userId)
	}
}
