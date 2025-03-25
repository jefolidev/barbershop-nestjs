"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const config_1 = require("@nestjs/config");
const mongoose = require("mongoose");
const database_constants_1 = require("../constants/database.constants");
exports.databaseProviders = [
    {
        provide: database_constants_1.DatabaseTokens.CONNECTION,
        inject: [config_1.ConfigService],
        useFactory: async (configService) => {
            const databaseURL = configService.get('DATABASE_URL');
            if (!databaseURL)
                throw new Error('DATABASE_URL não está definida.');
            try {
                const connection = await mongoose.connect(databaseURL);
                console.log('✅ MongooseDB is connected succefully!');
                return connection;
            }
            catch (error) {
                console.error('❌ Error was found at initialize the MongooseDB:', error);
                throw error;
            }
        },
    },
];
//# sourceMappingURL=database.service.js.map