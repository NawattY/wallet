import { registerAs } from "@nestjs/config";
import { join } from "path";

export default registerAs('database', () => ({
  mysql: {
    default: {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3000,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      entities: [
        join(__dirname, '../database/entities/**/*.entity{.ts,.js}'),
      ],
      migrations: [join(__dirname, '../database/migrations/*{.ts,.js}')],
      cli: {
        migrationsDir: 'src/app/database/migrations',
      },
      debug: process.env.DB_DEBUG === 'true' ? true : false,
    },
  },
  testing: {
    type: 'sqlite',
    database: ':memory:',
    entities: [
      join(__dirname, '../database/entities/**/*.entity{.ts,.js}'),
    ],
    synchronize: true,
    migrationsRun: false,
    migrations: [join(__dirname, '../database/migrations/*{.ts,.js}')],
  },
}));
  