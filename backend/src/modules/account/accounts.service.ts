import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { ModelTokens } from 'src/constants/models.constants'
import { IAccount } from 'src/schemas/profile.schema'
import { AccountDTO } from './dto/create-account.dto'

@Injectable()
export class AccountService {
	constructor(
		@Inject(ModelTokens.ACCOUNT)
		private accountModel: Model<IAccount>,
	) {}

	async create(accountData: AccountDTO) {
		const newAccount: AccountDTO = {
			...accountData,
		}

		const query = new this.accountModel(newAccount)
		return await query.save()
	}

	async findAll(): Promise<IAccount[]> {
		return await this.accountModel.find().exec()
	}

	async findAccountIdByCPF(userCpf: string) {
		const account = await this.accountModel.where({ cpf: userCpf }).select('_id')

		return account.toString()
	}

	async findIndexesCredentials(cpf: string, email: string, phone: string) {
		const query = await this.accountModel.findOne({
			$or: [{ cpf }, { email }, { phone }],
		})

		return query
	}
}
