import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoOfferingsSchema, Offerings } from 'src/schemas/offerings.schema'
import { CreateNewOfferingController } from './controllers/create-offering.controller'
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
	controllers: [CreateNewOfferingController],
	exports: [OfferingsService],
})
export class OfferingsModule {}
