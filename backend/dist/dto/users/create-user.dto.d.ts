import { z } from 'zod';
export declare const UserSchema: z.ZodObject<{
    name: z.ZodString;
    age: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    age: number;
}, {
    name: string;
    age: number;
}>;
export type UserDTO = z.infer<typeof UserSchema>;
