import { Module } from '@nestjs/common'
import { MongooseModule } from 'src/mongoose/database.module'
import { accountProvider } from './accounts.provider'
import { AccountService } from './accounts.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { GetAccountIdController } from './controllers/get-account-id-by-cpf.controller'
import { GetAllAccountsController } from './controllers/get-all-accounts.controller'

@Module({
	imports: [MongooseModule],
	controllers: [CreateAccountController, GetAccountIdController, GetAllAccountsController],
	providers: [AccountService, ...accountProvider],
	exports: [AccountService],
})
export class AccountModule {}
