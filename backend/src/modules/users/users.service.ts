import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { ModelTokens } from 'src/constants/models.constants'
import { UserDTO } from 'src/modules/users/dto/create-user.dto'
import { IUser } from 'src/schemas/user.schema'

@Injectable()
export class UsersService {
	constructor(
		@Inject(ModelTokens.USER)
		private userModel: Model<IUser>,
	) {}

	async create(userData: UserDTO, accountId: string) {
		const newUser: UserDTO = {
			...userData,
			_accountId: accountId,
		}

		const query = new this.userModel(newUser)
		return await query.save()
	}

	async findAll(): Promise<IUser[]> {
		return await this.userModel.find().exec()
	}
}
