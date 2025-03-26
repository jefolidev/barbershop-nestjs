import { z } from 'zod';
export declare const accountSchema: z.ZodObject<{
    cpf: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    password: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    cpf: string;
    email: string;
    phone: string;
    password: string;
}, {
    cpf: string;
    email: string;
    phone: string;
    password: string;
}>;
export type AccountDTO = z.infer<typeof accountSchema>;
