"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPassword = isValidPassword;
function isValidPassword(value, ctx) {
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const errors = [];
    if (!hasLetter)
        errors.push('The password must have some letter.');
    if (!hasUpperCase)
        errors.push('The password must have an uppercase letter.');
    if (!hasNumber)
        errors.push('The password must have some number.');
    if (errors.length > 0) {
        errors.forEach((message) => {
            ctx.addIssue({
                code: 'custom',
                message,
            });
        });
        return false;
    }
    return true;
}
//# sourceMappingURL=password-parse.js.map