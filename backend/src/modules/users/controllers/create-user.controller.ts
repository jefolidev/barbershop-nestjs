import { Body, ConflictException, Controller, Post, UsePipes } from '@nestjs/common'
import { hash } from 'bcrypt'
import { AccountService } from 'src/modules/account/accounts.service'
import { AccountDTO } from 'src/modules/account/dto/create-account.dto'
import { ZodValidationPipe } from 'src/pipes/zod-valitation.pipe'
import {
	CreateUserWithAccountDTO,
	UserDTO,
	createUserWithAccountSchema,
} from '../dto/create-user.dto'
import { UsersService } from '../users.service'

@Controller('users')
export class CreateUserController {
	constructor(
		private users: UsersService,
		private accounts: AccountService,
	) {}

	@Post()
	@UsePipes(new ZodValidationPipe(createUserWithAccountSchema))
	async create(@Body() body: CreateUserWithAccountDTO) {
		const { cpf, email, birthDate, gender, name, password, phone, profilePicture } = body

		const accountData: AccountDTO = { cpf, email, phone, password }
		const userData: UserDTO = { name, birthDate, gender, profilePicture }

		const existingUser = await this.accounts.findIndexesCredentials(cpf, email, phone)
		console.log('Existe um usuário com as credenciais: ', existingUser)

		const hashedPassword = await hash(accountData.password, 10)
		let accountId = await this.accounts.findAccountIdByCPF(cpf)

		if (existingUser) {
			throw new ConflictException('Already exist a user whit this credentials, try again.')
		}

		if (!accountId) {
			const newAccount = await this.accounts.create({
				...accountData,
				password: hashedPassword,
			})
			accountId = newAccount._id
		}

		if (!accountId) {
			throw new Error('Failed to create o retrive account ID')
		}

		await this.users.create(userData, accountId)
	}
}
