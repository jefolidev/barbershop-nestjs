import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

// export interface User extends Document {
// 	readonly _id: string
// 	readonly _accountId: string
// 	readonly name: string
// 	readonly birthDate: Date
// 	readonly gender: 'man' | 'woman' | 'other'
// 	readonly profilePicture?: string | undefined | null
// 	readonly createdAt: Date
// }

// export const MongooseUserSchema = new Schema(
// 	{
// 		_id: { type: String, default: () => randomUUID() },
// 		_accountId: { type: String },
// 		name: { type: String, required: true },
// 		birthDate: { type: Date, required: true },
// 		gender: {
// 			type: String,
// 			enum: ['man', 'woman', 'other'],
// 			required: true,
// 		},
// 		profilePicture: { type: String, required: false },
// 		createdAt: { type: Date, default: () => new Date() },
// 	},
// 	{ versionKey: false },
// )

export type IUser = User & Document

@Schema({ versionKey: false })
export class User {
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

	@Prop({ default: () => new Date() })
	createdAt: Date
}

export const MongoUserSchema = SchemaFactory.createForClass(User)
