"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
const databaseConfig = () => ({
    database: {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        synchronize: true,
        autoLoadEntities: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    },
});
exports.databaseConfig = databaseConfig;
//# sourceMappingURL=database.config.js.map