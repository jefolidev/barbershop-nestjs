import { Body, ConflictException, Controller, Post } from '@nestjs/common'
import { OfferingsDTO } from '../dto/offerings.dto'
import { OfferingsService } from '../offerings.service'

@Controller('offerings')
export class CreateNewOfferingController {
	constructor(private offering: OfferingsService) {}

	@Post()
	async create(@Body() body: OfferingsDTO) {
		console.log(`CORPO DA REQUISICAO: ${JSON.stringify(body, null, 2)}`)
		const { name, category, uniquePrice } = body

		const alreadyExistOfferingName = await this.offering.findOfferingByName(name)

		if (alreadyExistOfferingName !== null) {
			throw new ConflictException('Already exists this offering name. Please, choose other name')
		}

		await this.offering.create({ name, category, uniquePrice, isActive: true })
	}
}
