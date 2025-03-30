// import { Schema } from 'mongoose'
// import { randomUUID } from 'node:crypto'

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

// export interface Account {
// 	readonly _id: string
// 	readonly cpf: string
// 	readonly email: string
// 	readonly phone: string
// 	readonly password: string
// }

// export const MongooseAccountSchema = new Schema(
// 	{
// 		_id: { type: String, default: () => randomUUID() },
// 		cpf: { type: String, unique: true },
// 		email: { type: String, unique: true },
// 		phone: { type: String, unique: true },
// 		password: { type: String },
// 	},
// 	{ versionKey: false },
// )

export type IAccount = Account & Document

@Schema({ versionKey: false })
export class Account {
	@Prop({ default: () => crypto.randomUUID() })
	_id: string

	@Prop({ required: true, unique: true })
	cpf: string

	@Prop({ required: true, unique: true })
	email: string

	@Prop({ required: true, unique: true })
	phone: string

	@Prop({ required: true })
	password: string
}

export const MongoAccountSchema = SchemaFactory.createForClass(Account)
