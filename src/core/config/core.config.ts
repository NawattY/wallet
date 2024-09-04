import { registerAs } from "@nestjs/config";

export default registerAs('core', () => ({
  port: parseInt(process.env.APP_PORT),
  host: process.env.APP_HOST,
  exceptionLogEnabled: process.env.EXCEPTION_LOG_ENABLED === 'true',
  isTesting: false,
}));