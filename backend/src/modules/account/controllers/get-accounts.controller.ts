import { Controller, Get } from '@nestjs/common'
import { Account } from 'src/schemas/account.schema'
import { AccountService } from '../accounts.service'

@Controller('accounts')
export class GetAllAccountsController {
	constructor(private accountService: AccountService) {}

	@Get()
	async findAll(): Promise<Account[]> {
		return this.accountService.findAll()
	}
}
