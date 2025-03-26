import { z } from 'zod';
export declare const userProfileSchema: z.ZodObject<{
    userId: z.ZodString;
    cpf: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    password: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    cpf: string;
    email: string;
    phone: string;
    password: string;
}, {
    userId: string;
    cpf: string;
    email: string;
    phone: string;
    password: string;
}>;
