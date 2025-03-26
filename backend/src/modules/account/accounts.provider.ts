import { Provider } from '@nestjs/common'
import { Connection } from 'mongoose'
import { DatabaseTokens } from 'src/constants/database.constants'
import { ModelTokens } from 'src/constants/models.constants'
import { MongooseAccountSchema } from 'src/schemas/profile.schema'

export const accountProvider: Provider[] = [
	{
		provide: ModelTokens.ACCOUNT,
		useFactory: (connection: Connection) => connection.model('account', MongooseAccountSchema),
		inject: [DatabaseTokens.CONNECTION],
	},
]
