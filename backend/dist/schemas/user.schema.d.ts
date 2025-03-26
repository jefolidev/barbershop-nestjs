import { Schema } from 'mongoose';
import { Document } from 'mongoose';
export interface IUser extends Document {
    readonly _id: string;
    readonly _accountId: string;
    readonly name: string;
    readonly birthDate: Date;
    readonly gender: 'man' | 'woman' | 'other';
    readonly profilePicture?: string | undefined | null;
    readonly createdAt: Date;
}
export declare const MongooseUserSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    versionKey: false;
}, {
    _id: Buffer<ArrayBufferLike>;
    name: string;
    birthDate: NativeDate;
    gender: "man" | "woman" | "other";
    createdAt: NativeDate;
    profilePicture?: string | null | undefined;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    _id: Buffer<ArrayBufferLike>;
    name: string;
    birthDate: NativeDate;
    gender: "man" | "woman" | "other";
    createdAt: NativeDate;
    profilePicture?: string | null | undefined;
}>> & import("mongoose").FlatRecord<{
    _id: Buffer<ArrayBufferLike>;
    name: string;
    birthDate: NativeDate;
    gender: "man" | "woman" | "other";
    createdAt: NativeDate;
    profilePicture?: string | null | undefined;
}> & Required<{
    _id: Buffer<ArrayBufferLike>;
}> & {
    __v: number;
}>;
