import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-valitation.pipe'
import { UserDTO, userSchema } from '../dto/create-user.dto'
import { UsersService } from '../users.service'

@Controller('users')
export class CreateUserController {
	constructor(private userService: UsersService) {}

	@Post()
	@UsePipes(new ZodValidationPipe(userSchema))
	async create(@Body() body: UserDTO) {
		const { name, gender, birthDate, profilePicture } = body

		await this.userService.create({
			name,
			gender,
			birthDate,
			profilePicture,
		})
	}
}
