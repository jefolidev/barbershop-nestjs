import { Injectable, NotFoundException } from '@nestjs/common'
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

	async findOfferingById(offeringId: string): Promise<Offerings> {
		console.log(`ID do Service de findOfferingById: ${offeringId}`)
		const offering = await this.offeringModel.findOne({ _id: offeringId })

		console.log(`Offering achado: ${offering}`)

		if (!offering) {
			throw new NotFoundException("Offering don't founded, please, try again!")
		}

		return offering
	}

	async editOfferingById(offeringId: string, offeringData: Offerings) {
		const result = await this.offeringModel.updateOne(
			{ _id: offeringId },
			{ $set: offeringData },
			{ new: true },
		)

		if (result.modifiedCount === 0) {
			throw new NotFoundException('Offering not updated!')
		}

		return result
	}
}
