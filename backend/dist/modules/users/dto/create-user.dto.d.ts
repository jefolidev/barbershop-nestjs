import { z } from 'zod';
export declare const userSchema: z.ZodObject<{
    _accountId: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    birthDate: z.ZodDate;
    gender: z.ZodEnum<["man", "woman", "other"]>;
    profilePicture: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    birthDate: Date;
    gender: "man" | "woman" | "other";
    _accountId?: string | undefined;
    profilePicture?: string | undefined;
}, {
    name: string;
    birthDate: Date;
    gender: "man" | "woman" | "other";
    _accountId?: string | undefined;
    profilePicture?: string | undefined;
}>;
export type UserDTO = z.infer<typeof userSchema>;
export declare const createUserWithAccountSchema: z.ZodObject<z.objectUtil.extendShape<{
    _accountId: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    birthDate: z.ZodDate;
    gender: z.ZodEnum<["man", "woman", "other"]>;
    profilePicture: z.ZodOptional<z.ZodString>;
}, {
    cpf: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    password: z.ZodEffects<z.ZodString, string, string>;
}>, "strip", z.ZodTypeAny, {
    cpf: string;
    email: string;
    phone: string;
    password: string;
    name: string;
    birthDate: Date;
    gender: "man" | "woman" | "other";
    _accountId?: string | undefined;
    profilePicture?: string | undefined;
}, {
    cpf: string;
    email: string;
    phone: string;
    password: string;
    name: string;
    birthDate: Date;
    gender: "man" | "woman" | "other";
    _accountId?: string | undefined;
    profilePicture?: string | undefined;
}>;
export type CreateUserWithAccountDTO = z.infer<typeof createUserWithAccountSchema>;
