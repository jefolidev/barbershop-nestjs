import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { z } from 'zod'
import { AuthService } from '../auth.service'

const credentialSignBodySchema = z.object({
	login: z.string(),
	password: z.string(),
})

type CredentialsSignBodySchema = z.infer<typeof credentialSignBodySchema>

@Controller('auth')
export class AuthController {
	constructor(private auth: AuthService) {
		console.log('AuthController inicializado!')
	}

	@HttpCode(HttpStatus.OK)
	@Post('/login')
	async signIn(@Body() body: CredentialsSignBodySchema) {
		const { login, password } = body

		return await this.auth.signIn({ cpf: login, email: login, phone: login }, password)
	}
}
