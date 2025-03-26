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
exports.CreateProfileController = void 0;
const common_1 = require("@nestjs/common");
const zod_valitation_pipe_1 = require("../../../pipes/zod-valitation.pipe");
const create_profile_dto_1 = require("../dto/create-profile.dto");
let CreateProfileController = class CreateProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
    }
    async create(body) { }
};
exports.CreateProfileController = CreateProfileController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_valitation_pipe_1.ZodValidationPipe(create_profile_dto_1.userProfileSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateProfileController.prototype, "create", null);
exports.CreateProfileController = CreateProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [Function])
], CreateProfileController);
//# sourceMappingURL=create-profile.controller.js.map