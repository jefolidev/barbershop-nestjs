import { Controller, Get } from '@nestjs/common'
import { IAccount } from 'src/schemas/profile.schema'
import { AccountService } from '../accounts.service'

@Controller()
export class GetAllAccountsController {
	constructor(private accountService: AccountService) {}

	@Get()
	async findAll(): Promise<IAccount[]> {
		return await this.accountService.findAll()
	}
}
