import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { BarberService } from 'src/modules/barber/barber.service'
import { ScheduleService } from '../schedules.service'

@Controller('schedules')
export class GetScheduleByBarberIdController {
	constructor(
		private schedule: ScheduleService,
		private barber: BarberService,
	) {}

	@Get('barber/:_barberId')
	async findAll(@Param('_barberId') barberId: string) {
		if (!barberId) {
			throw new NotFoundException(
				'Barber id not provided, please, insert the barber Id.',
				'Barber id is null or undefined.',
			)
		}

		const hasBarberWithBarberId = await this.barber.findBarberById(barberId)

		if (!hasBarberWithBarberId) {
			throw new NotFoundException(
				'Barber id not founded, please, try other id.',
				'Barber id not not exists.',
			)
		}

		return this.schedule.findScheduleByBarberId(barberId)
	}
}
