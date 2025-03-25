"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseUserSchema = void 0;
const mongoose_1 = require("mongoose");
const node_crypto_1 = require("node:crypto");
exports.MongooseUserSchema = new mongoose_1.Schema({
    id: { type: 'UUID', default: () => (0, node_crypto_1.randomUUID)(), unique: true },
    name: { type: String },
    age: Number,
    createdAt: { type: Date, default: () => new Date() },
});
//# sourceMappingURL=user.schema.js.map