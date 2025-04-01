import { Body, ConflictException, Controller, Param, Put } from '@nestjs/common'
import { Offerings } from 'src/schemas/offerings.schema'
import { OfferingsService } from '../offerings.service'

@Controller('offerings')
export class UpdateOfferingController {
	constructor(private offering: OfferingsService) {}

	@Put(':_id')
	async switchOfferingStatus(@Param('_id') offeringId: string, @Body() offeringData: Offerings) {
		const alreadyExistOfferingWithNewName = await this.offering.findOfferingByName(
			offeringData.name,
		)

		if (alreadyExistOfferingWithNewName) {
			throw new ConflictException('Already exists a offering with this name, please, choose other.')
		}

		await this.offering.editOfferingById(offeringId, {
			...offeringData,
		})
	}
}
