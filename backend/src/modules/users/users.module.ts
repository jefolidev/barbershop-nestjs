import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoUserSchema, User } from 'src/schemas/user.schema'
import { AccountModule } from '../account/accounts.module'
import { CreateUserController } from './controllers/create-user.controller'
import { GetAllUsersController } from './controllers/get-users.controller'
import { UsersService } from './users.service'

@Module({
	imports: [
		AccountModule,
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: MongoUserSchema,
			},
		]),
	],
	providers: [UsersService],
	controllers: [CreateUserController, GetAllUsersController],
	exports: [UsersService],
})
export class UsersModule {}
