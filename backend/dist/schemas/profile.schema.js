"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseUserProfileSchema = void 0;
const mongoose_1 = require("mongoose");
const node_crypto_1 = require("node:crypto");
const { UUID } = mongoose_1.Schema.Types;
exports.MongooseUserProfileSchema = new mongoose_1.Schema({
    _id: { type: UUID, default: () => (0, node_crypto_1.randomUUID)() },
    _userId: { type: UUID, ref: 'user' },
    cpf: { type: String, unique: true },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: { type: String },
}, { versionKey: false });
//# sourceMappingURL=profile.schema.js.map