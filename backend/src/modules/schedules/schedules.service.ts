import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Schedules } from 'src/schemas/schedules.schema'
import { SchedulesDTO } from './dto/schedules.dto'

@Injectable()
export class ScheduleService {
	constructor(
		@InjectModel(Schedules.name)
		private scheduleModel: Model<Schedules>,
	) {}

	async findAll(): Promise<SchedulesDTO[]> {
		return this.scheduleModel.find().exec()
	}

	async findScheduleByUserId(userId: string): Promise<SchedulesDTO[]> {
		return this.scheduleModel.find({ _userId: userId }).exec()
	}

	async findScheduleByBarberId(barberId: string): Promise<SchedulesDTO[]> {
		return this.scheduleModel.find({ _barberId: barberId }).exec()
	}

	async create(userId: string, scheduleData: SchedulesDTO) {
		if (!userId) {
			throw new NotFoundException(
				'User id not founded, please try again with other id or fix the current.',
			)
		}

		const newSchedule = { ...scheduleData, _userId: userId }
		await new this.scheduleModel(newSchedule).save()

		return newSchedule
	}
}
