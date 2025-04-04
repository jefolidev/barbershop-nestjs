import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoOfferingsSchema, Offerings } from 'src/schemas/offerings.schema'
import { CreateNewOfferingController } from './controllers/create-offering.controller'
import { DeleteOfferingController } from './controllers/delete-offering.controller'
import { GetAllOfferings } from './controllers/get-offerings.controller'
import { SwitchOfferingStatusController } from './controllers/switch-offering-status.controller'
import { UpdateOfferingController } from './controllers/update-offering.controller'
import { OfferingsService } from './offerings.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Offerings.name,
				schema: MongoOfferingsSchema,
			},
		]),
	],
	providers: [OfferingsService],
	controllers: [
		CreateNewOfferingController,
		DeleteOfferingController,
		GetAllOfferings,
		SwitchOfferingStatusController,
		UpdateOfferingController,
	],
	exports: [OfferingsService],
})
export class OfferingsModule {}
