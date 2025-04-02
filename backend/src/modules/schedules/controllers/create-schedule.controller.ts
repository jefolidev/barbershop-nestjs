import { Body, ConflictException, Controller, Param, Post } from '@nestjs/common'
import * as dayjs from 'dayjs'
import * as isBetween from 'dayjs/plugin/isBetween'
import * as tz from 'dayjs/plugin/timezone'
import * as utc from 'dayjs/plugin/utc'
import { BarberService } from 'src/modules/barber/barber.service'
import { OfferingsService } from 'src/modules/offerings/offerings.service'
import { Offerings } from 'src/schemas/offerings.schema'
import { SchedulesDTO } from '../dto/schedules.dto'
import { ScheduleService } from '../schedules.service'

dayjs.extend(isBetween)
dayjs.extend(tz)
dayjs.extend(utc)

@Controller('schedules')
export class CreateNewSchedule {
	constructor(
		private schedule: ScheduleService,
		private services: OfferingsService,
		private barber: BarberService,
	) {}

	@Post(':_userId')
	async create(@Param('_userId') userId: string, @Body() body: SchedulesDTO) {
		const { _barberId, _serviceId, scheduleDate } = body

		const servicesOfSchedule = await Promise.all(
			_serviceId.map(async (id) => {
				return await this.services.findOfferingById(id)
			}),
		)

		const barberSchedules = await this.barber.getBarberSchedulesById(_barberId)
		const barberWorkSchedules = await this.barber.getBarberWorkSchedule(_barberId)

		if (!barberWorkSchedules) {
			throw new Error()
		}

		console.log(
			'horario dos barbeiros',
			Object.entries(barberWorkSchedules).map((schedule) => {
				return schedule[1].end
			}),
		)

		const barberSchedulesDate = barberSchedules.map((schedules) => {
			return dayjs(schedules.scheduleDate).utc()
		})
		const hasAvailableBarberSchedule = barberSchedulesDate.map((dates) => {
			const dateInDayJS = dayjs.utc(scheduleDate)
			const endSchedule = dates.add(1, 'hour')
			const isBetweenFromAExistingScheule = dateInDayJS.isBetween(dates, endSchedule, null, '[)')

			if (isBetweenFromAExistingScheule) {
				throw new ConflictException(
					'This barber does not have opening hours during this period.',
					'No hours available.',
				)
			}

			return true
		})

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
			hasNoShowFee: false,
			totalPrice: totalPriceOfSchedule,
		}

		// return await this.schedule.create(userId, newSchedule)
		return console.log('FIM DO PROCESSO! ')
	}
}
