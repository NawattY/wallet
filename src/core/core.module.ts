import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import coreConfig from '@core/config/core.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [coreConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class CoreModule {}
