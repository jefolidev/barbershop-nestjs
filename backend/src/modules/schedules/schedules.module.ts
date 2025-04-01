import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoScheduleSchema, Schedules } from 'src/schemas/schedules.schema'
import { BarberModule } from '../barber/barber.module'
import { UsersModule } from '../users/users.module'

@Module({
	imports: [
		BarberModule,
		UsersModule,
		MongooseModule.forFeature([
			{
				name: Schedules.name,
				schema: MongoScheduleSchema,
			},
		]),
	],
	controllers: [],
	providers: [],
})
export class SchedulesModule {}
