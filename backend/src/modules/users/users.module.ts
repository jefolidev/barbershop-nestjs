import { Module } from '@nestjs/common'
import { MongooseModule } from 'src/mongoose/database.module'
import { AccountModule } from '../account/accounts.module'
import { CreateUserController } from './controllers/create-user.controller'
import { GetAllUsersController } from './controllers/get-users.controller'
import { userProvider } from './users.provider'
import { UsersService } from './users.service'

@Module({
	imports: [MongooseModule, AccountModule],
	controllers: [CreateUserController, GetAllUsersController],
	providers: [UsersService, ...userProvider],
})
export class UsersModule {}
