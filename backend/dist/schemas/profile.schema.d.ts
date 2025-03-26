import { Schema } from 'mongoose';
export interface IUserProfile {
    readonly _id: string;
    readonly _userId: string;
    readonly cpf: string;
    readonly email: string;
    readonly phone: string;
    readonly password: string;
}
export declare const MongooseUserProfileSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
}, {
    _id: Buffer<ArrayBufferLike>;
    _userId?: Buffer<ArrayBufferLike> | null | undefined;
    cpf?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    password?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    _id: Buffer<ArrayBufferLike>;
    _userId?: Buffer<ArrayBufferLike> | null | undefined;
    cpf?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    password?: string | null | undefined;
}>> & import("mongoose").FlatRecord<{
    _id: Buffer<ArrayBufferLike>;
    _userId?: Buffer<ArrayBufferLike> | null | undefined;
    cpf?: string | null | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    password?: string | null | undefined;
}> & Required<{
    _id: Buffer<ArrayBufferLike>;
}> & {
    __v: number;
}>;
