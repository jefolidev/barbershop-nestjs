import { Provider } from '@nestjs/common'
import { Connection } from 'mongoose'
import { DatabaseTokens } from 'src/constants/database.constants'
import { ModelTokens } from 'src/constants/models.constants'
import { MongooseUserSchema } from 'src/schemas/user.schema'

export const userProvider: Provider[] = [
	{
		provide: ModelTokens.USER,
		useFactory: (connection: Connection) => connection.model('user', MongooseUserSchema),
		inject: [DatabaseTokens.CONNECTION],
	},
]
