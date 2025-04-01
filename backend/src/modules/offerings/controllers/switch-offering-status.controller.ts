import { Controller, Param, Put } from '@nestjs/common'
import { Offerings } from 'src/schemas/offerings.schema'
import { OfferingsService } from '../offerings.service'

@Controller('offerings')
export class SwitchOfferingStatusController {
	constructor(private offering: OfferingsService) {}

	@Put('/switch_status/:_id')
	async switchOfferingStatus(@Param('_id') offeringId: string, offeringData: Offerings) {
		const offering = await this.offering.findOfferingById(offeringId)

		await this.offering.editOfferingById(offeringId, {
			...offeringData,
			isActive: !offering.isActive,
		})
	}
}
