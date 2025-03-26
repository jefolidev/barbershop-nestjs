"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileProvider = void 0;
const database_constants_1 = require("../../constants/database.constants");
const models_constants_1 = require("../../constants/models.constants");
const profile_schema_1 = require("../../schemas/profile.schema");
exports.profileProvider = [
    {
        provide: models_constants_1.ModelTokens.PROFILE,
        useFactory: (connection) => connection.model('profile', profile_schema_1.MongooseUserProfileSchema),
        inject: [database_constants_1.DatabaseTokens.CONNECTION],
    },
];
//# sourceMappingURL=profiles.provider.js.map