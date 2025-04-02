import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { randomUUID } from 'node:crypto'

export type ISchedules = Schedules & Document

type RatesValues = 1 | 2 | 3 | 4 | 5

class Feedback {
	@Prop({ required: false, type: Number })
	rating?: RatesValues

	@Prop({ required: false, type: String })
	commentary?: string
}

@Schema({ versionKey: false })
export class Schedules {
	@Prop({ required: true, default: () => randomUUID() })
	_id: string

	@Prop({ required: true })
	_barberId: string

	@Prop({ required: true })
	_userId: string

	@Prop({ required: true })
	_serviceId: string[]

	@Prop({ required: false })
	_requestId: string

	@Prop({ required: true })
	scheduleDate: Date

	@Prop({ required: false })
	note: string

	@Prop({ required: true })
	hasNoShowFee: boolean

	@Prop({ required: false })
	noShowFeeValue: string

	@Prop({ required: true })
	totalPrice: number

	@Prop({ required: true })
	paymendMethod: 'debit' | 'credit' | 'pix'

	@Prop({ required: true })
	isPayed: boolean

	@Prop({ required: true })
	paymentModality: 'remote' | 'presencial'

	@Prop({ required: false })
	customerFeedback: Feedback

	@Prop({ required: true, default: () => new Date() })
	scheduledAt: Date

	@Prop({ required: false })
	canceledAt: Date

	@Prop({ required: false })
	cancelReason: string

	@Prop({ required: false })
	barberRating: Feedback
}

export const MongoScheduleSchema = SchemaFactory.createForClass(Schedules)
