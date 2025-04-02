import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDTO } from 'src/modules/users/dto/create-user.dto'
import { User } from 'src/schemas/user.schema'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name)
		private userModel: Model<User>,
	) {}

	async create(userData: UserDTO, accountId: string) {
		const user = new this.userModel({
			...userData,
			_accountId: accountId,
		})

		await user.save()

		return user
	}

	async findAll(): Promise<User[]> {
		return await this.userModel.find().exec()
	}

	async findUserById(userId: string) {
		if (!userId) {
			throw new NotFoundException('User id is probably null or undefined.')
		}

		return await this.userModel.findOne({ _id: userId })
	}
}
