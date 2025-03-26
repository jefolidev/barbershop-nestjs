"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileSchema = void 0;
const password_parse_1 = require("../../../utils/password-parse");
const zod_1 = require("zod");
exports.userProfileSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    cpf: zod_1.z
        .string()
        .min(11, {
        message: 'CPF field is imcomplete, please, check the field and try again.',
    })
        .max(14, {
        message: 'CPF field exceeds the total amount, please, check the field and try again.',
    }),
    email: zod_1.z.string().email({
        message: 'Email is incorrect, please check the field and try again.',
    }),
    phone: zod_1.z
        .string()
        .min(11, {
        message: 'Phone field is imcomplete, please, check the field and try again.',
    })
        .max(15, {
        message: 'Phone field exceeds the total amount, please, check the field and try again.',
    }),
    password: zod_1.z.string().superRefine((value, ctx) => {
        !(0, password_parse_1.isValidPassword)(value, ctx);
    }),
});
//# sourceMappingURL=create-profile.dto.js.map