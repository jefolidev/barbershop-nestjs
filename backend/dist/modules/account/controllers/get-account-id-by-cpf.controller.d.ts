import { AccountService } from '../accounts.service';
export declare class GetAccountIdController {
    private accountService;
    constructor(accountService: AccountService);
    findAccountId(userCpf: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../schemas/profile.schema").IAccount> & import("../../../schemas/profile.schema").IAccount & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
}
