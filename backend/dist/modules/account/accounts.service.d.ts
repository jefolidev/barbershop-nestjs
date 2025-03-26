import { Model } from 'mongoose';
import { IAccount } from 'src/schemas/profile.schema';
import { AccountDTO } from './dto/create-account.dto';
export declare class AccountService {
    private accountModel;
    constructor(accountModel: Model<IAccount>);
    create(accountData: AccountDTO): Promise<import("mongoose").Document<unknown, {}, IAccount> & IAccount & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<IAccount[]>;
    findAccountIdByCPF(userCpf: string): Promise<(import("mongoose").Document<unknown, {}, IAccount> & IAccount & Required<{
        _id: string;
    }> & {
        __v: number;
    }) | null>;
}
