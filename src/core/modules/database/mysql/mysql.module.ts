import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mysqlConfig from './mysql.config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forFeature(mysqlConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService
      ): TypeOrmModuleOptions =>
        configService.get('core.isTesting')
          ? configService.get('mysql.testing')
          : configService.get('mysql.default'),
    } as TypeOrmModuleAsyncOptions),
  ],
  exports: [TypeOrmModule],
  controllers: [],
  providers: [],
})
export class MySqlModule {}