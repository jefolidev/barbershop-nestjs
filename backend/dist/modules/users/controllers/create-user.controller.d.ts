import { UserDTO } from '../dto/create-user.dto';
import { UsersService } from '../users.service';
export declare class CreateUserController {
    private userService;
    constructor(userService: UsersService);
    create(body: UserDTO): Promise<void>;
}
