import { Controller, Get } from '@nestjs/common'
import { IUser } from 'src/schemas/user.schema'
import { UsersService } from '../users.service'

@Controller('users')
export class GetAllUsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	getUsers(): Promise<IUser[]> {
		return this.usersService.findAll()
	}
}
