import { isValidPassword } from 'src/utils/password-parse'
import { z } from 'zod'

export const accountSchema = z.object({
	cpf: z
		.string()
		.min(11, {
			message: 'CPF field is imcomplete, please, check the field and try again.',
		})
		.max(14, {
			message: 'CPF field exceeds the total amount, please, check the field and try again.',
		}),
	email: z.string().email({
		message: 'Email is incorrect, please check the field and try again.',
	}),
	phone: z
		.string()
		.min(11, {
			message: 'Phone field is imcomplete, please, check the field and try again.',
		})
		.max(15, {
			message: 'Phone field exceeds the total amount, please, check the field and try again.',
		}),
	password: z.string().superRefine((value, ctx) => {
		!isValidPassword(value, ctx)
	}),
})

export type AccountDTO = z.infer<typeof accountSchema>
