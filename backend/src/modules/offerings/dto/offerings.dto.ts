import { z } from 'zod'

const barberOfferingsSchema = z.enum(['hairCut', 'beardTrim'])

export const offeringsRequestBodySchema = z.object({
	name: z.string(),
	uniquePrice: z.number(),
	category: barberOfferingsSchema,
	isActive: z.boolean(),
})

export type OfferingsDTO = z.infer<typeof offeringsRequestBodySchema>
