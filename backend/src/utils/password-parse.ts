import type { z } from 'zod'

export function isValidPassword(value: string, ctx: z.RefinementCtx): boolean {
	const hasLetter = /[a-zA-Z]/.test(value)
	const hasUpperCase = /[A-Z]/.test(value)
	const hasNumber = /\d/.test(value)

	const errors: string[] = []

	if (!hasLetter) errors.push('The password must have some letter.')
	if (!hasUpperCase) errors.push('The password must have an uppercase letter.')
	if (!hasNumber) errors.push('The password must have some number.')

	if (errors.length > 0) {
		errors.forEach((message) => {
			ctx.addIssue({
				code: 'custom',
				message,
			})
		})
		return false
	}

	return true
}
