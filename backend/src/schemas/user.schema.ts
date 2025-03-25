import { Schema } from 'mongoose'
import { randomUUID } from 'node:crypto'

import type { Document } from 'mongoose'

export interface IUser extends Document {
	readonly id: string
	readonly name: string
	readonly age: number
	readonly createdAt: Date
}

export const MongooseUserSchema = new Schema({
	id: { type: 'UUID', default: () => randomUUID(), unique: true },
	name: { type: String },
	age: Number,
	createdAt: { type: Date, default: () => new Date() },
})
