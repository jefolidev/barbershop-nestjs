import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { UsersModule } from './modules/users/users.module'
import { MongooseModule } from './mongoose/database.module'

@Module({
	imports: [
		UsersModule,
		MongooseModule,

		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
	],
})
export class AppModule {}
