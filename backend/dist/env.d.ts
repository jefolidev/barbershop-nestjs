import { z } from 'zod';
export declare const envSchema: z.ZodObject<{
    DATABASE_URL: z.ZodString;
    PORT: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    DATABASE_URL: string;
    PORT: number;
}, {
    DATABASE_URL: string;
    PORT?: number | undefined;
}>;
export type Env = z.infer<typeof envSchema>;
