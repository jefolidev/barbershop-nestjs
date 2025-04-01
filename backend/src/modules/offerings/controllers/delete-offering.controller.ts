import { Controller, Delete, NotFoundException, Param } from '@nestjs/common'
import { OfferingsService } from '../offerings.service'

@Controller('offerings')
export class DeleteOfferingController {
	constructor(private offering: OfferingsService) {}

	@Delete(':_id')
	async switchOfferingStatus(@Param('_id') offeringId: string) {
		if (!offeringId) {
			throw new NotFoundException('Offering id not founded.')
		}

		await this.offering.delete(offeringId)
	}
}
