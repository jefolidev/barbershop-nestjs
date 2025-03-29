import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/modules/auth.module'
import { envSchema } from './env'
import { UsersModule } from './modules/users/users.module'
import { MongooseModule } from './mongoose/database.module'

@Module({
	imports: [
		UsersModule,
		AuthModule,
		MongooseModule,

		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
	],
})
export class AppModule {
	constructor() {
		console.log('AUTH MODULE SENDO CARREGADO!!!!')
	}
}
