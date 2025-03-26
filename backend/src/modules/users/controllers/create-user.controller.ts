import { Body, Controller, Post, UsePipes } from '@nestjs/common'
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
		private userService: UsersService,
		private accountService: AccountService,
	) {}

	@Post()
	@UsePipes(new ZodValidationPipe(createUserWithAccountSchema))
	async create(@Body() body: CreateUserWithAccountDTO) {
		const { cpf, email, birthDate, gender, name, password, phone, profilePicture } = body

		const accountData: AccountDTO = { cpf, email, phone, password }
		const userData: UserDTO = { name, birthDate, gender, profilePicture }

		const accountId = await this.accountService.findAccountIdByCPF(cpf)
		console.log(accountId)

		if (!accountId) {
			const newAccount = await this.accountService.create(accountData)
		}

		if (!accountId) {
			throw new Error('Failed to create o retrive account ID')
		}

		await this.userService.create(userData, '479e55ef-42af-4a3b-b049-ddb51fbb8619')
	}
}
