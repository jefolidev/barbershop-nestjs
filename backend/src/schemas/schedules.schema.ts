import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { randomUUID } from 'node:crypto'

export type ISchedules = Schedules & Document

type RatesValues = 1 | 2 | 3 | 4 | 5

@Schema({ versionKey: false })
export class Schedules {
	@Prop({ required: true, default: () => randomUUID() })
	_id: string

	@Prop({ required: true })
	_barberId: string

	@Prop({ required: true })
	_userId: string

	@Prop({ required: true })
	_serviceId: string

	@Prop({ required: false })
	_requestId: string | undefined

	@Prop({ required: true })
	scheduleDate: Date

	@Prop({ required: false })
	note: string | undefined

	@Prop({ required: true })
	hasNoShowFee: boolean

	@Prop({ required: false })
	noShowFeeValue: string | undefined

	@Prop({ required: true })
	totalPrice: number

	@Prop({ required: true })
	paymendMethod: 'debit' | 'credit' | 'pix'

	@Prop({ required: true })
	isPayed: boolean

	@Prop({ required: true })
	paymentModality: 'remote' | 'presencial'

	@Prop({ required: false })
	customerFeedback: {
		rating: RatesValues | undefined
		commentary: string | undefined
	}

	@Prop({ required: true })
	scheduledAt: Date

	@Prop({ required: false })
	canceledAt: Date | undefined

	@Prop({ required: false })
	cancelReason: string | undefined

	@Prop({ required: false })
	barberRating: {
		rating: RatesValues | undefined
		commentary: string | undefined
	}
}

export const MongoScheduleSchema = SchemaFactory.createForClass(Schedules)
