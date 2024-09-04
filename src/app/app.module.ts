import { Module } from '@nestjs/common';
import { AppController } from '@app/api/controllers/app.controller';
import { AppService } from '@app/services/app.service';
import { CoreModule } from '@core/core.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@app/config/app.config';
import { MySqlModule } from '@core/modules/database/mysql/mysql.module';

@Module({
  imports: [
    CoreModule,
    MySqlModule,
    ConfigModule.forRoot({
      load: [appConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
