import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserDTO } from 'src/dto/users/create-user.dto'
import { IUser } from 'src/schemas/user.schema'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private userServices: UsersService) {}

	@Get()
	findAll(): Promise<IUser[]> {
		return this.userServices.findAll()
	}

	@Post()
	create(@Body() body: UserDTO) {
		const { name, age } = body

		const user = this.userServices.create({ name, age })
		return user
	}
}
