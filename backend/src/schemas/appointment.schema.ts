import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import type { Document } from 'mongoose'

export type IAppointments = Appointments & Document

@Schema({ versionKey: false })
export class Appointments {
	@Prop({ required: true, default: () => crypto.randomUUID() })
	_id: string

	@Prop({ required: true })
	_barberId: string

	@Prop({ required: true })
	_clientId: string

	@Prop({ required: true })
	_serviceId: string

	@Prop({ required: true })
	scheduleDate: Date

	@Prop({ required: true })
	status: 'pending' | 'confirmed' | 'canceled'

	@Prop({ default: () => new Date() })
	createdAt: Date
}

export const MongoAppointmentsSchema = SchemaFactory.createForClass(Appointments)
