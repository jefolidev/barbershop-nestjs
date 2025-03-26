"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseUserSchema = void 0;
const mongoose_1 = require("mongoose");
const node_crypto_1 = require("node:crypto");
exports.MongooseUserSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.UUID, default: () => (0, node_crypto_1.randomUUID)() },
    name: { type: String, required: true, unique: false },
    birthDate: { type: Date, required: true, unique: false },
    gender: {
        type: String,
        enum: ['man', 'woman', 'other'],
        required: true,
        unique: false,
    },
    profilePicture: { type: String, required: false, unique: false },
    createdAt: { type: Date, default: () => new Date(), unique: false },
}, { versionKey: false });
//# sourceMappingURL=user.schema.js.map