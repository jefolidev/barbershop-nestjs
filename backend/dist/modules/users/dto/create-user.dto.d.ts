import { z } from 'zod';
export declare const userSchema: z.ZodObject<{
    name: z.ZodString;
    birthDate: z.ZodDate;
    gender: z.ZodEnum<["man", "woman", "other"]>;
    profilePicture: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    birthDate: Date;
    gender: "man" | "woman" | "other";
    profilePicture?: string | undefined;
}, {
    name: string;
    birthDate: Date;
    gender: "man" | "woman" | "other";
    profilePicture?: string | undefined;
}>;
export type UserDTO = z.infer<typeof userSchema>;
