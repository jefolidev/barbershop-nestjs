"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserWithAccountSchema = exports.userSchema = void 0;
const create_account_dto_1 = require("../../account/dto/create-account.dto");
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    _accountId: zod_1.z.string().uuid().optional(),
    name: zod_1.z.string(),
    birthDate: zod_1.z.coerce.date(),
    gender: zod_1.z.enum(['man', 'woman', 'other']),
    profilePicture: zod_1.z.string().startsWith('data:image/').optional(),
});
exports.createUserWithAccountSchema = exports.userSchema.merge(create_account_dto_1.accountSchema);
//# sourceMappingURL=create-user.dto.js.map