import { Body, ConflictException, Controller, Param, Post } from '@nestjs/common'
import { OfferingsService } from 'src/modules/offerings/offerings.service'
import { Offerings } from 'src/schemas/offerings.schema'
import { SchedulesDTO } from '../dto/schedules.dto'
import { ScheduleService } from '../schedules.service'

@Controller('schedules')
export class CreateNewSchedule {
	constructor(
		private schedule: ScheduleService,
		private services: OfferingsService,
	) {}

	@Post(':_userId')
	async create(@Param('_userId') userId: string, @Body() body: SchedulesDTO) {
		const { _serviceId } = body

		const servicesOfSchedule = await Promise.all(
			_serviceId.map(async (id) => {
				return await this.services.findOfferingById(id)
			}),
		)

		const totalPriceOfSchedule = servicesOfSchedule.reduce((total: number, service: Offerings) => {
			return total + service.uniquePrice
		}, 0)

		const hasMoreThanOneServiceOfSameCategory = servicesOfSchedule.some((service, _, array) => {
			return array.filter((_service) => _service.category === service.category).length > 1
		})

		if (hasMoreThanOneServiceOfSameCategory) {
			throw new ConflictException(
				`You cant't make a reserve with two same cattegory. You current request: ${servicesOfSchedule}`,
				'Duplicated service cattegory',
			)
		}

		const newSchedule: SchedulesDTO = {
			...body,
			_userId: userId,
			scheduleDate: new Date(),
			hasNoShowFee: false,
			totalPrice: totalPriceOfSchedule,
		}

		return await this.schedule.create(userId, newSchedule)
	}
}
