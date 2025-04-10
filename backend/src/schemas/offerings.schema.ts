import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { Document } from 'mongoose'
import { randomUUID } from 'node:crypto'

export type IOfferings = Offerings & Document

enum OfferingsCategories {
	Haircut = 'cut',
	BeardTrim = 'beard',
}

@Schema({ versionKey: false })
export class Offerings {
	@Prop({ required: true, default: () => randomUUID() })
	_id: string

	@Prop({ required: true, unique: true })
	name: string

	@Prop({ required: true })
	uniquePrice: number

	@Prop({ required: true })
	category: OfferingsCategories

	@Prop({ required: true })
	isActive: boolean
}

export const MongoOfferingsSchema = SchemaFactory.createForClass(Offerings)
