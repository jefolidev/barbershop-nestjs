import { Schema } from 'mongoose';
import type { Document } from 'mongoose';
export interface IUser extends Document {
    readonly id: string;
    readonly name: string;
    readonly age: number;
    readonly createdAt: Date;
}
export declare const MongooseUserSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    id: Buffer<ArrayBufferLike>;
    createdAt: NativeDate;
    name?: string | null | undefined;
    age?: number | null | undefined;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    id: Buffer<ArrayBufferLike>;
    createdAt: NativeDate;
    name?: string | null | undefined;
    age?: number | null | undefined;
}>> & import("mongoose").FlatRecord<{
    id: Buffer<ArrayBufferLike>;
    createdAt: NativeDate;
    name?: string | null | undefined;
    age?: number | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
