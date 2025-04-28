import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Formation } from '../formation/formation.entity';







dotenv.config();

export const databaseConfig = () => ({
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    autoLoadEntities: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'], // ✅ C’est ça qui corrige le bug
  } as TypeOrmModuleOptions,
});
