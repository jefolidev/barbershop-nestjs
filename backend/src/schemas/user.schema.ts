import { Schema } from 'mongoose'

import { Document } from 'mongoose'
import { randomUUID } from 'node:crypto'

export interface IUser extends Document {
	readonly _id: string
	readonly name: string
	readonly birthDate: Date
	readonly gender: 'man' | 'woman' | 'other'
	readonly profilePicture?: string | undefined | null
	readonly createdAt: Date
}

export const MongooseUserSchema = new Schema(
	{
		_id: { type: Schema.Types.UUID, default: () => randomUUID() },
		name: { type: String, required: true, unique: false },
		birthDate: { type: Date, required: true, unique: false },
		gender: {
			type: String,
			enum: ['man', 'woman', 'other'],
			required: true,
			unique: false,
		},
		profilePicture: { type: String, required: false, unique: false },
		createdAt: { type: Date, default: () => new Date(), unique: false },
	},
	{ versionKey: false },
)
