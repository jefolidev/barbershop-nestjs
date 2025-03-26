import { Inject, Injectable } from '@nestjs/common'
import type { Model } from 'mongoose'
import { ModelTokens } from 'src/constants/models.constants'
import type { UserDTO } from 'src/modules/users/dto/create-user.dto'
import type { IUser } from 'src/schemas/user.schema'

@Injectable()
export class UsersService {
	constructor(
		@Inject(ModelTokens.USER)
		private userModel: Model<IUser>,
	) {}

	async create(createUserDTO: UserDTO) {
		const newUser = new this.userModel(createUserDTO)
		return await newUser.save()
	}

	async findAll(): Promise<IUser[]> {
		return await this.userModel.find().exec()
	}
}
