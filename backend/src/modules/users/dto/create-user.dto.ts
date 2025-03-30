import { accountSchema } from 'src/modules/account/dto/create-account.dto'
import { z } from 'zod'

export const userSchema = z.object({
	_accountId: z.string().uuid().optional(),
	name: z.string(),
	birthDate: z.coerce.date(),
	gender: z.enum(['man', 'woman', 'other']),
	role: z.enum(['user', 'barber']).default('user'),
	profilePicture: z.string().startsWith('data:image/').optional(),
})

export type UserDTO = z.infer<typeof userSchema>

export const createUserWithAccountSchema = userSchema.merge(accountSchema)

export type CreateUserWithAccountDTO = z.infer<typeof createUserWithAccountSchema>
