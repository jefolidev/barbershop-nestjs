"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../mongoose/database.module");
const accounts_provider_1 = require("./accounts.provider");
const accounts_service_1 = require("./accounts.service");
const create_account_controller_1 = require("./controllers/create-account.controller");
const get_account_id_by_cpf_controller_1 = require("./controllers/get-account-id-by-cpf.controller");
let AccountModule = class AccountModule {
};
exports.AccountModule = AccountModule;
exports.AccountModule = AccountModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.MongooseModule],
        controllers: [create_account_controller_1.CreateAccountController, get_account_id_by_cpf_controller_1.GetAccountIdController],
        providers: [accounts_service_1.AccountService, ...accounts_provider_1.accountProvider],
        exports: [accounts_service_1.AccountService],
    })
], AccountModule);
//# sourceMappingURL=accounts.module.js.map