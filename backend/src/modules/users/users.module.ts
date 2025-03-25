import { Module } from '@nestjs/common'
import { MongooseModule } from 'src/mongoose/database.module'
import { UsersController } from './users.controller'
import { userProvider } from './users.provider'
import { UsersService } from './users.service'

@Module({
	imports: [MongooseModule],
	controllers: [UsersController],
	providers: [UsersService, ...userProvider],
})
export class UsersModule {}
