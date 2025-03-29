import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { AccountService } from 'src/modules/account/accounts.service'

@Injectable()
export class AuthService {
	constructor(
		private account: AccountService,
		private jwt: JwtService,
	) {}

	async signIn(
		{ cpf, email, phone }: { cpf: string; email: string; phone: string },
		password: string,
	) {
		const accounts = await this.account.findIndexesCredentials(cpf, email, phone)

		console.log('\nLogin recebido: \n', { cpf, email, phone }, '\n\nSenha: ', password)

		if (!accounts) {
			throw new NotFoundException(
				'No account founded, please, check if the current user is signed and try again.',
			)
		}

		const JWTToken = this.jwt.sign({
			sub: accounts?._id,
		})

		const isPasswordMatch = await compare(password, accounts.password)

		if (!isPasswordMatch) {
			throw new UnauthorizedException("The credentials don't match, try again.")
		}

		return { auth_token: JWTToken }
	}
}
