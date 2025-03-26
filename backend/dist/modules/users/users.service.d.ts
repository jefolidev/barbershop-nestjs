import { Model } from 'mongoose';
import { UserDTO } from 'src/modules/users/dto/create-user.dto';
import { IUser } from 'src/schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<IUser>);
    create(userData: UserDTO, accountId: string): Promise<import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<IUser[]>;
}
