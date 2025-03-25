import { UserDTO } from 'src/dto/users/create-user.dto';
import { IUser } from 'src/schemas/user.schema';
import { UsersService } from './users.service';
export declare class UsersController {
    private userServices;
    constructor(userServices: UsersService);
    findAll(): Promise<IUser[]>;
    create(body: UserDTO): Promise<import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
