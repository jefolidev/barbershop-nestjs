import {
	Body,
	ConflictException,
	Controller,
	NotFoundException,
	Post,
	UsePipes,
} from '@nestjs/common'
import { hash } from 'bcrypt'
import { AccountService } from 'src/modules/account/accounts.service'
import { AccountDTO } from 'src/modules/account/dto/create-account.dto'
import { ZodValidationPipe } from 'src/pipes/zod-valitation.pipe'
import { BarberService } from '../barber.service'
import { BarberAndAccountDTO, BarberDTO, barberAndAccountBodyRequesSchema } from '../dto/barber.dto'

@Controller('barbers')
export class CreateNewBarberController {
	constructor(
		private barber: BarberService,
		private account: AccountService,
	) {}

	@Post()
	@UsePipes(new ZodValidationPipe(barberAndAccountBodyRequesSchema))
	async create(@Body() body: BarberAndAccountDTO) {
		const {
			birthDate,
			createdAt,
			gender,
			name,
			profilePicture,
			role,
			workSchedule,
			cpf,
			email,
			password,
			phone,
		} = body

		const barberData: BarberDTO = {
			birthDate,
			createdAt,
			gender,
			name,
			profilePicture,
			role,
			workSchedule,
		}
		const accountData: AccountDTO = { cpf, email, phone, password }

		const barberAlreadyExists = await this.account.findIndexesCredentials(cpf, email, phone)

		if (barberAlreadyExists) {
			throw new ConflictException('This account already exists, please do login.')
		}

		console.log(JSON.stringify(`BARBER DATA:  ${JSON.stringify(barberData, null, 2)}`))
		console.log(JSON.stringify(`ACCOUNT DATA:  ${JSON.stringify(accountData, null, 2)}`))

		const hashedPassword = await hash(accountData.password, 10)

		let accountId = await this.account.findAccountIdByCPF(cpf)

		if (!accountId && !barberAlreadyExists) {
			const account = await this.account.create({
				...accountData,
				password: hashedPassword,
			})

			accountId = account._id
		}

		if (!accountId) {
			throw new NotFoundException()
		}

		await this.barber.create(barberData, accountId)
	}
}
