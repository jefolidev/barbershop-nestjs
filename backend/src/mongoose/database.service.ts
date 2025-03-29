import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import * as mongoose from 'mongoose'
import { DatabaseTokens } from 'src/constants/database.constants'

export const databaseProviders: Provider[] = [
	{
		provide: DatabaseTokens.CONNECTION,
		inject: [ConfigService],
		useFactory: async (configService: ConfigService): Promise<typeof mongoose> => {
			const databaseURL = configService.get<string>('DATABASE_URL')

			if (!databaseURL) throw new Error('DATABASE_URL não está definida.')

			try {
				const connection = await mongoose.connect(databaseURL)
				console.log('✅ MongooseDB is connected succefully!')
				return connection
			} catch (error) {
				console.error('❌ Error was found at initialize the MongooseDB:', error)
				throw error
			}
		},
	},
]
