import { Schema } from 'mongoose'

import { Document } from 'mongoose'
import { randomUUID } from 'node:crypto'

export interface IUser extends Document {
	readonly _id: string
	readonly _accountId: string
	readonly name: string
	readonly birthDate: Date
	readonly gender: 'man' | 'woman' | 'other'
	readonly profilePicture?: string | undefined | null
	readonly createdAt: Date
}

export const MongooseUserSchema = new Schema(
	{
		_id: { type: Schema.Types.UUID, default: () => randomUUID() },
		name: { type: String, required: true },
		birthDate: { type: Date, required: true },
		gender: {
			type: String,
			enum: ['man', 'woman', 'other'],
			required: true,
		},
		profilePicture: { type: String, required: false },
		createdAt: { type: Date, default: () => new Date() },
	},
	{ versionKey: false },
)
