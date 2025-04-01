import { Body, Controller, Param, Put } from '@nestjs/common'
import type { Offerings } from 'src/schemas/offerings.schema'
import { OfferingsService } from '../offerings.service'

@Controller('offerings')
export class SwitchOfferingStatusController {
	constructor(private offering: OfferingsService) {}

	@Put(':_id')
	async switchOfferingStatus(@Param('_id') offeringId: string, @Body() offeringData: Offerings) {
		const offering = await this.offering.findOfferingById(offeringId)

		// const updatedData = { ...offering, ...offeringData }

		await this.offering.editOfferingById(offeringId, {
			...offeringData,
			isActive: !offering.isActive,
		})
	}
}
