"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseUserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MongooseUserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gender: { type: String, enum: ['man', 'woman', 'other'], required: true },
    profilePicture: { type: String, required: false },
    createdAt: { type: Date, default: () => new Date() },
});
//# sourceMappingURL=user.schema.js.map