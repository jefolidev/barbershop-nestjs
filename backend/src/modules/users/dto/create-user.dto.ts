import { z } from 'zod'

export const userSchema = z.object({
	name: z.string(),
	birthDate: z.string().transform((string) => new Date(string)),
	gender: z.enum(['man', 'woman', 'other']),
	profilePicture: z.string().startsWith('data:image/').optional(),
})

export type UserDTO = z.infer<typeof userSchema>
