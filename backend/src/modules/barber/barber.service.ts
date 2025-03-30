import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Barber } from 'src/schemas/barber.schema'
import { BarberDTO } from './dto/barber.dto'

@Injectable()
export class BarberService {
	constructor(
		@InjectModel(Barber.name)
		private barberModel: Model<Barber>,
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
}
