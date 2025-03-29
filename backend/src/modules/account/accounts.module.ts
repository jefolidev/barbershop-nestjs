import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Account, MongoAccountSchema } from 'src/schemas/account.schema'
import { AccountService } from './accounts.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { GetAccountIdController } from './controllers/get-account-id-by-cpf.controller'
import { GetAllAccountsController } from './controllers/get-all-accounts.controller'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Account.name,
				schema: MongoAccountSchema,
			},
		]),
	],

	controllers: [CreateAccountController, GetAccountIdController, GetAllAccountsController],

	providers: [AccountService],
	exports: [AccountService],
})
export class AccountModule {}
