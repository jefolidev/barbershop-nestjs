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
exports.CreateUserController = void 0;
const common_1 = require("@nestjs/common");
const accounts_service_1 = require("../../account/accounts.service");
const zod_valitation_pipe_1 = require("../../../pipes/zod-valitation.pipe");
const create_user_dto_1 = require("../dto/create-user.dto");
const users_service_1 = require("../users.service");
let CreateUserController = class CreateUserController {
    userService;
    accountService;
    constructor(userService, accountService) {
        this.userService = userService;
        this.accountService = accountService;
    }
    async create(body) {
        const { cpf, email, birthDate, gender, name, password, phone, profilePicture } = body;
        const accountData = { cpf, email, phone, password };
        const userData = { name, birthDate, gender, profilePicture };
        const accountId = await this.accountService.findAccountIdByCPF(cpf);
        console.log(accountId);
        if (!accountId) {
            const newAccount = await this.accountService.create(accountData);
        }
        if (!accountId) {
            throw new Error('Failed to create o retrive account ID');
        }
        await this.userService.create(userData, '479e55ef-42af-4a3b-b049-ddb51fbb8619');
    }
};
exports.CreateUserController = CreateUserController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_valitation_pipe_1.ZodValidationPipe(create_user_dto_1.createUserWithAccountSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateUserController.prototype, "create", null);
exports.CreateUserController = CreateUserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        accounts_service_1.AccountService])
], CreateUserController);
//# sourceMappingURL=create-user.controller.js.map