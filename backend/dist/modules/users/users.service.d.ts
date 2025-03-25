import type { Model } from 'mongoose';
import type { UserDTO } from 'src/dto/users/create-user.dto';
import type { IUser } from 'src/schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<IUser>);
    create(createUserDTO: UserDTO): Promise<import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<IUser[]>;
}
