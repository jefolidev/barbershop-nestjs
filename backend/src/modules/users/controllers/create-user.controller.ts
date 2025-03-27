import { Body, Controller, Post, UsePipes } from '@nestjs/common'
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
		private userService: UsersService,
		private accountService: AccountService,
	) {}

	@Post()
	@UsePipes(new ZodValidationPipe(createUserWithAccountSchema))
	async create(@Body() body: CreateUserWithAccountDTO) {
		const { cpf, email, birthDate, gender, name, password, phone, profilePicture } = body

		const accountData: AccountDTO = { cpf, email, phone, password }
		const userData: UserDTO = { name, birthDate, gender, profilePicture }

		const hashedPassword = await hash(accountData.password, 10)
		let accountId = await this.accountService.findAccountIdByCPF(cpf)

		if (!accountId) {
			const newAccount = await this.accountService.create({
				...accountData,
				password: hashedPassword,
			})
			accountId = newAccount._id
		}

		if (!accountId) {
			throw new Error('Failed to create o retrive account ID')
		}

		await this.userService.create(userData, accountId)
	}
}
