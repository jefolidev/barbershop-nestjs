import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/modules/auth.module'
import { Env, envSchema } from './env'
import { AccountModule } from './modules/account/accounts.module'
import { BarberModule } from './modules/barber/barber.module'
import { OfferingsModule } from './modules/offerings/offerings.module'
import { SchedulesModule } from './modules/schedules/schedules.module'
import { UsersModule } from './modules/users/users.module'

@Module({
	imports: [
		AccountModule,
		AuthModule,
		BarberModule,
		SchedulesModule,
		OfferingsModule,
		UsersModule,

		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),

		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService<Env, true>) => ({
				uri: config.get('DATABASE_URL'),
			}),
		}),
	],
})
export class AppModule {}
