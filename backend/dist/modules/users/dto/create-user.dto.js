"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string(),
    birthDate: zod_1.z.string().transform((string) => new Date(string)),
    gender: zod_1.z.enum(['man', 'woman', 'other']),
    profilePicture: zod_1.z.string().startsWith('data:image/').optional(),
});
//# sourceMappingURL=create-user.dto.js.map