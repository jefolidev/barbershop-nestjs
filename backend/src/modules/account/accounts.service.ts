import { Inject, Injectable, NotFoundException } from '@nestjs/common'
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

	async findAccountByCPF(userCpf: string): Promise<IAccount> {
		const account = await this.accountModel.findOne({ cpf: userCpf })

		if (!account) {
			throw new NotFoundException('User account not finded, please check if is a registered user!')
		}

		return account
	}

	async findAccountByEmail(userEmail: string): Promise<IAccount> {
		const account = await this.accountModel.findOne({ email: userEmail })

		if (!account) {
			throw new NotFoundException('User account not finded, please check if is a registered user!')
		}

		return account
	}

	async findAccountByPhone(userPhone: string): Promise<IAccount> {
		const account = await this.accountModel.findOne({ phone: userPhone })

		if (!account) {
			throw new NotFoundException('User account not finded, please check if is a registered user!')
		}

		return account
	}

	async findIndexesCredentials(cpf: string, email: string, phone: string) {
		const query = await this.accountModel.findOne({
			$or: [{ cpf }, { email }, { phone }],
		})

		return query
	}
}
