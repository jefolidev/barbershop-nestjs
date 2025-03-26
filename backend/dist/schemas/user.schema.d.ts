import { Schema } from 'mongoose';
import { Document } from 'mongoose';
export interface IUser extends Document {
    readonly id: string;
    readonly name: string;
    readonly birthDate: Date;
    readonly gender: 'man' | 'woman' | 'other';
    readonly profilePicture?: string | undefined;
    readonly createdAt: Date;
}
export declare const MongooseUserSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    birthDate: NativeDate;
    gender: "man" | "woman" | "other";
    createdAt: NativeDate;
    profilePicture?: string | null | undefined;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    birthDate: NativeDate;
    gender: "man" | "woman" | "other";
    createdAt: NativeDate;
    profilePicture?: string | null | undefined;
}>> & import("mongoose").FlatRecord<{
    name: string;
    birthDate: NativeDate;
    gender: "man" | "woman" | "other";
    createdAt: NativeDate;
    profilePicture?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
