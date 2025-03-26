import { AccountService } from 'src/modules/account/accounts.service';
import { CreateUserWithAccountDTO } from '../dto/create-user.dto';
import { UsersService } from '../users.service';
export declare class CreateUserController {
    private userService;
    private accountService;
    constructor(userService: UsersService, accountService: AccountService);
    create(body: CreateUserWithAccountDTO): Promise<void>;
}
