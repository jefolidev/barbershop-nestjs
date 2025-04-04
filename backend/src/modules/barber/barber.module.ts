import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Barber, MongoBarberSchema } from 'src/schemas/barber.schema'
import { AccountModule } from '../account/accounts.module'
import { SchedulesModule } from '../schedules/schedules.module'
import { BarberService } from './barber.service'
import { CreateNewBarberController } from './controllers/create-barber.controller'
import { GetAllBarbersController } from './controllers/get-barbers.controller'

@Module({
	imports: [
		AccountModule,
		forwardRef(() => SchedulesModule),
		MongooseModule.forFeature([
			{
				name: Barber.name,
				schema: MongoBarberSchema,
			},
		]),
	],
	providers: [BarberService],
	controllers: [GetAllBarbersController, CreateNewBarberController],
	exports: [BarberService],
})
export class BarberModule {}
