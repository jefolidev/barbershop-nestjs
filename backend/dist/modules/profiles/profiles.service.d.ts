import type { Model } from 'mongoose';
import type { IUserProfile } from 'src/schemas/profile.schema';
import type { IUser } from 'src/schemas/user.schema';
import type { UserProfileDTO } from './dto/create-profile.dto';
export declare class ProfilesServices {
    private profileModel;
    private userModel;
    constructor(profileModel: Model<IUserProfile>, userModel: Model<IUser>);
    findUserProfile(): Promise<void>;
    create(createProfileDTO: UserProfileDTO): Promise<import("mongoose").Document<unknown, {}, IUserProfile> & IUserProfile & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<IUserProfile[]>;
}
