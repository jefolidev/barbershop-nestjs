import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoScheduleSchema, Schedules } from 'src/schemas/schedules.schema'
import { BarberModule } from '../barber/barber.module'
import { OfferingsModule } from '../offerings/offerings.module'
import { UsersModule } from '../users/users.module'
import { CreateNewSchedule } from './controllers/create-schedule.controller'
import { GetScheduleByUserIdController } from './controllers/get-schedules-by-user-d.controller'
import { ScheduleService } from './schedules.service'

@Module({
	imports: [
		BarberModule,
		UsersModule,
		OfferingsModule,
		MongooseModule.forFeature([
			{
				name: Schedules.name,
				schema: MongoScheduleSchema,
			},
		]),
	],
	controllers: [CreateNewSchedule, GetScheduleByUserIdController],
	providers: [ScheduleService],
	exports: [ScheduleService],
})
export class SchedulesModule {}
