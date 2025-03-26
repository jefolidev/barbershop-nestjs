import { Schema } from 'mongoose'
import { randomUUID } from 'node:crypto'

export interface IAccount {
	readonly _id: string
	readonly cpf: string
	readonly email: string
	readonly phone: string
	readonly password: string
}

const { UUID } = Schema.Types

export const MongooseAccountSchema = new Schema(
	{
		_id: { type: UUID, default: () => randomUUID() },
		cpf: { type: String, unique: true },
		email: { type: String, unique: true },
		phone: { type: String, unique: true },
		password: { type: String },
	},
	{ versionKey: false },
)
