"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProvider = void 0;
const database_constants_1 = require("../../constants/database.constants");
const models_constants_1 = require("../../constants/models.constants");
const user_schema_1 = require("../../schemas/user.schema");
exports.userProvider = [
    {
        provide: models_constants_1.ModelTokens.USER,
        useFactory: (connection) => connection.model('user', user_schema_1.MongooseUserSchema),
        inject: [database_constants_1.DatabaseTokens.CONNECTION],
    },
];
//# sourceMappingURL=users.provider.js.map