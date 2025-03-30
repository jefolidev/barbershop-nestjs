import { Controller, Get } from '@nestjs/common'
import { Barber } from 'src/schemas/barber.schema'
import { BarberService } from '../barber.service'

@Controller('barbers')
export class GetAllBarbersController {
	constructor(private barber: BarberService) {}

	@Get()
	async findAll(): Promise<Barber[]> {
		return await this.barber.findAll()
	}
}
