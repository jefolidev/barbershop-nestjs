import { z } from 'zod'

const RatesValues = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])

export const SchedulesSchema = z.object({
	_barberId: z.string().uuid(),
	_userId: z.string().uuid(),
	_serviceId: z.string().uuid(),
	_requestId: z.string().uuid().optional(),
	scheduleDate: z.date(),
	note: z.string().optional(),
	hasNoShowFee: z.boolean(),
	noShowFeeValue: z.string().optional(),
	totalPrice: z.number(),
	paymendMethod: z.enum(['debit', 'credit', 'pix']),
	isPayed: z.boolean(),
	paymentModality: z.enum(['remote', 'presencial']),
	customerFeedback: z
		.object({
			rating: RatesValues.optional(),
			commentary: z.string().optional(),
		})
		.optional(),
	scheduledAt: z.date(),
	canceledAt: z.date().optional(),
	cancelReason: z.string().optional(),
	barberRating: z
		.object({
			rating: RatesValues.optional(),
			commentary: z.string().optional(),
		})
		.optional(),
})

export type Schedules = z.infer<typeof SchedulesSchema>
