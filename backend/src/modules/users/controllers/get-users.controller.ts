import { Controller, Get } from '@nestjs/common'
import { User } from 'src/schemas/user.schema'
import { UsersService } from '../users.service'

@Controller('users')
export class GetAllUsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	getUsers(): Promise<User[]> {
		return this.usersService.findAll()
	}
}
