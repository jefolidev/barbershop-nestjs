import { Schema } from 'mongoose'

import { Document } from 'mongoose'

export interface IUser extends Document {
	readonly id: string
	readonly name: string
	readonly birthDate: Date
	readonly gender: 'man' | 'woman' | 'other'
	readonly profilePicture?: string | undefined
	readonly createdAt: Date
}

export const MongooseUserSchema = new Schema({
	name: { type: String, required: true },
	birthDate: { type: Date, required: true },
	gender: { type: String, enum: ['man', 'woman', 'other'], required: true },
	profilePicture: { type: String, required: false },
	createdAt: { type: Date, default: () => new Date() },
})
