import { AccountService } from '../accounts.service';
import { AccountDTO } from '../dto/create-account.dto';
export declare class CreateAccountController {
    private accountService;
    constructor(accountService: AccountService);
    create(body: AccountDTO): Promise<void>;
}
