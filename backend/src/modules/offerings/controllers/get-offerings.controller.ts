import { Controller, Get } from '@nestjs/common'
import { Offerings } from 'src/schemas/offerings.schema'
import { OfferingsService } from '../offerings.service'

@Controller('offerings')
export class GetAllOfferings {
	constructor(private offering: OfferingsService) {}

	@Get()
	async findAll(): Promise<Offerings[]> {
		return this.offering.findAll()
	}
}
