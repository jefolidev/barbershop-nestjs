import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-valitation.pipe'
import { AccountService } from '../accounts.service'
import { AccountDTO, accountSchema } from '../dto/create-account.dto'

@Controller('accounts')
export class CreateAccountController {
	constructor(private accountService: AccountService) {}

	@Post()
	@UsePipes(new ZodValidationPipe(accountSchema))
	async create(@Body() body: AccountDTO) {
		const { cpf, email, password, phone } = body

		await this.accountService.create({ cpf, email, password, phone })
	}
}
