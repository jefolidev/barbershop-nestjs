import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Offerings } from 'src/schemas/offerings.schema'
import { OfferingsDTO } from './dto/offerings.dto'

@Injectable()
export class OfferingsService {
	constructor(
		@InjectModel(Offerings.name)
		private offeringModel: Model<Offerings>,
	) {}

	async create(offeringData: OfferingsDTO) {
		const querie = new this.offeringModel(offeringData)

		await querie.save()
		return querie
	}

	async findAll(): Promise<Offerings[]> {
		const offerings = this.offeringModel.find().exec()

		return offerings
	}

	async findOfferingByName(name: string): Promise<Offerings | null> {
		const offering = await this.offeringModel.findOne({ name })

		return offering
	}
}
