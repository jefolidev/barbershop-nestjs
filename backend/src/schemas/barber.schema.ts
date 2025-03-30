import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type IBarber = Barber & Document

@Schema({ versionKey: false })
export class Barber {
	@Prop({ default: () => crypto.randomUUID() })
	_id: string

	@Prop({ required: true })
	_accountId: string

	@Prop({ required: true })
	name: string

	@Prop({ required: true })
	birthDate: Date

	@Prop({ required: true })
	role: 'user' | 'barber'

	@Prop({ required: true })
	gender: 'man' | 'woman' | 'other'

	@Prop({ required: false })
	profilePicture: string

	@Prop({ required: true })
	workSchedule: { [day: string]: { start: string; end: string } }

	@Prop({ default: () => new Date() })
	createdAt: Date
}

export const MongoBarberSchema = SchemaFactory.createForClass(Barber)
