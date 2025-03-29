import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from '../auth.service'

interface CredentialsSignInRequest {
	login: string
	password: string
}

@Controller('auth')
export class AuthController {
	constructor(private auth: AuthService) {
		console.log('AuthController inicializado!')
	}

	@Post('/login')
	async signIn(@Body() { login, password }: CredentialsSignInRequest) {
		return await this.auth.signIn({ cpf: login, email: login, phone: login }, password)
	}
}
