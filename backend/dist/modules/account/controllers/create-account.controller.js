"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountController = void 0;
const common_1 = require("@nestjs/common");
const zod_valitation_pipe_1 = require("../../../pipes/zod-valitation.pipe");
const accounts_service_1 = require("../accounts.service");
const create_account_dto_1 = require("../dto/create-account.dto");
let CreateAccountController = class CreateAccountController {
    accountService;
    constructor(accountService) {
        this.accountService = accountService;
    }
    async create(body) {
        const { cpf, email, password, phone } = body;
        await this.accountService.create({ cpf, email, password, phone });
    }
};
exports.CreateAccountController = CreateAccountController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_valitation_pipe_1.ZodValidationPipe(create_account_dto_1.accountSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateAccountController.prototype, "create", null);
exports.CreateAccountController = CreateAccountController = __decorate([
    (0, common_1.Controller)('accounts'),
    __metadata("design:paramtypes", [accounts_service_1.AccountService])
], CreateAccountController);
//# sourceMappingURL=create-account.controller.js.map