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
const zod_valitation_pipe_1 = require("../../../pipes/zod-valitation.pipe");
const create_user_dto_1 = require("../dto/create-user.dto");
const users_service_1 = require("../users.service");
let CreateUserController = class CreateUserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async create(body) {
        const { name, gender, birthDate, profilePicture } = body;
        await this.userService.create({
            name,
            gender,
            birthDate,
            profilePicture,
        });
    }
};
exports.CreateUserController = CreateUserController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_valitation_pipe_1.ZodValidationPipe(create_user_dto_1.userSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateUserController.prototype, "create", null);
exports.CreateUserController = CreateUserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], CreateUserController);
//# sourceMappingURL=create-user.controller.js.map