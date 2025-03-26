import { Schema } from 'mongoose';
export interface IAccount {
    readonly _id: string;
    readonly cpf: string;
    readonly email: string;
    readonly phone: string;
    readonly password: string;
}
export declare const MongooseAccountSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
}, {
    _id: Buffer<ArrayBufferLike>;
    cpf?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    password?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    _id: Buffer<ArrayBufferLike>;
    cpf?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    password?: string | null | undefined;
}>> & import("mongoose").FlatRecord<{
    _id: Buffer<ArrayBufferLike>;
    cpf?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    password?: string | null | undefined;
}> & Required<{
    _id: Buffer<ArrayBufferLike>;
}> & {
    __v: number;
}>;
