import { accountSchema } from 'src/modules/account/dto/create-account.dto'
import { z } from 'zod'

const daysOfWeekEnum = z.enum([
	'sunday',
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
])

const timeString = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format (HH:MM)')

const workScheduleSchema = z.record(
	daysOfWeekEnum,
	z.object({
		start: timeString,
		end: timeString,
	}),
)

export const barberSchema = z.object({
	_id: z.string().uuid(),
	_accountId: z.string().uuid().optional(),
	name: z.string(),
	birthDate: z.coerce.date(),
	role: z.enum(['user', 'barber']),
	gender: z.enum(['man', 'woman', 'other']),
	profilePicture: z.string(),
	workSchedule: workScheduleSchema,
	createdAt: z.date().default(() => new Date()),
})

export const barberAndAccountBodyRequesSchema = barberSchema.merge(accountSchema)

export type BarberDTO = z.infer<typeof barberSchema>

export type BarberAndAccountDTO = z.infer<typeof barberAndAccountBodyRequesSchema>
