import { registerAs } from "@nestjs/config";

export default registerAs('mysql', () => ({
  default: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3000,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: ['@app/database/entities/**/*.entity.js'],
    migrations: ['@app/database/migrations/*.js'],
    cli: {
      migrationsDir: '@app/database/migrations',
    },
    debug: process.env.DB_DEBUG === 'true' ? true : false,
  },
  testing: {
    type: 'sqlite',
    database: ':memory:',
    entities: ['@app/database/entities/**/*.entity.ts'],
    synchronize: true,
    migrationsRun: false,
    migrations: ['@app/database/migrations/**/*.js'],
  },
}));
  