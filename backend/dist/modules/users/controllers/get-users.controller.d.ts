import { IUser } from 'src/schemas/user.schema';
import { UsersService } from '../users.service';
export declare class GetAllUsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<IUser[]>;
}
