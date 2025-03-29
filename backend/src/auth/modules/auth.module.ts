import { Module } from '@nestjs/common'
import { AccountModule } from 'src/modules/account/accounts.module'
import { AuthService } from './auth.service'

import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from 'src/env'
import { AuthController } from './controllers/auth.controller'

@Module({
	imports: [
		AccountModule,
		JwtModule.registerAsync({
			global: true,
			inject: [ConfigService],
			useFactory(config: ConfigService<Env, true>) {
				const secret = config.get('JWT_SECRET', { infer: true })

				return {
					signOptions: { algorithm: 'HS256' },
					secret,
				}
			},
		}),

		PassportModule,
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
