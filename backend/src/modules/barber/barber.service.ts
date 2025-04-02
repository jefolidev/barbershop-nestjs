import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Barber } from 'src/schemas/barber.schema'
import { ScheduleService } from '../schedules/schedules.service'
import { BarberDTO } from './dto/barber.dto'

@Injectable()
export class BarberService {
	constructor(
		@InjectModel(Barber.name)
		private barberModel: Model<Barber>,
		@Inject(forwardRef(() => ScheduleService))
		private schedules: ScheduleService,
	) {}

	async create(barberData: BarberDTO, accountId: string) {
		const barber = new this.barberModel({
			...barberData,
			_accountId: accountId,
		})

		await barber.save()
		return barber
	}

	async findAll(): Promise<Barber[]> {
		const barbers = this.barberModel.find().exec()

		return barbers
	}

	async findBarberById(barberId: string) {
		if (!barberId) {
			throw new NotFoundException('User id is probably null or undefined.')
		}

		return await this.barberModel.findOne({ _id: barberId })
	}

	async getBarberSchedulesById(barberId: string) {
		if (!barberId) {
			throw new NotFoundException('User id is probably null or undefined.')
		}

		const barberSchedules = await this.schedules.findScheduleByBarberId(barberId)
		return barberSchedules
	}

	async getBarberWorkSchedule(barberId: string) {
		if (!barberId) {
			throw new NotFoundException('User id is probably null or undefined.')
		}

		const barber = await this.findBarberById(barberId)
		const workSchedules = barber?.workSchedule

		return workSchedules
	}
}
