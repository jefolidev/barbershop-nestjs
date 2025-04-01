import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoOfferingsSchema, Offerings } from 'src/schemas/offerings.schema'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Offerings.name,
				schema: MongoOfferingsSchema,
			},
		]),
	],
	controllers: [],
	providers: [],
})
export class OfferingsModule {}
