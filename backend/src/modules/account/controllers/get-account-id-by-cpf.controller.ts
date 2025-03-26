import { Controller, Get, Param } from '@nestjs/common'
import { AccountService } from '../accounts.service'

@Controller('accounts')
export class GetAccountIdController {
	constructor(private accountService: AccountService) {}

	@Get()
	findAccountId(@Param() userCpf: string) {
		const accountId = this.accountService.findAccountIdByCPF(userCpf)
		return accountId
	}
}
