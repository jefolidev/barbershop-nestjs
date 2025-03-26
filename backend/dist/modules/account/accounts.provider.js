"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountProvider = void 0;
const database_constants_1 = require("../../constants/database.constants");
const models_constants_1 = require("../../constants/models.constants");
const profile_schema_1 = require("../../schemas/profile.schema");
exports.accountProvider = [
    {
        provide: models_constants_1.ModelTokens.ACCOUNT,
        useFactory: (connection) => connection.model('account', profile_schema_1.MongooseAccountSchema),
        inject: [database_constants_1.DatabaseTokens.CONNECTION],
    },
];
//# sourceMappingURL=accounts.provider.js.map