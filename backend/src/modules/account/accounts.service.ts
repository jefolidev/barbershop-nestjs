import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Account } from 'src/schemas/account.schema'
import { AccountDTO } from './dto/create-account.dto'

@Injectable()
export class AccountService {
	constructor(
		@InjectModel(Account.name)
		private accountModel: Model<Account>,
	) {}

	async create(accountData: AccountDTO) {
		const newAccount = new this.accountModel(accountData)

		await newAccount.save()
		return newAccount
	}

	async findAll(): Promise<Account[]> {
		return await this.accountModel.find().exec()
	}

	async findAccountIdByCPF(userCpf: string) {
		// console.log('USER CPF PASSADO PARA A REQUISICAO: ', userCpf)
		const account = await this.accountModel.findOne({ cpf: userCpf }).select('_id')
		// console.log('ACCOUNT ACHADO PROCURANDO ID POR CPF:', account)

		return account?._id
	}

	async findAccountByCPF(userCpf: string): Promise<Account> {
		const account = await this.accountModel.findOne({ cpf: userCpf })

		if (!account) {
			throw new NotFoundException('User account not finded, please check if is a registered user!')
		}

		return account
	}

	async findAccountByEmail(userEmail: string): Promise<Account> {
		const account = await this.accountModel.findOne({ email: userEmail })

		if (!account) {
			throw new NotFoundException('User account not finded, please check if is a registered user!')
		}

		return account
	}

	async findAccountByPhone(userPhone: string): Promise<Account> {
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
