import { Module } from '@nestjs/common';
import { AppController } from '@app/api/controllers/app.controller';
import { AppService } from '@app/services/app.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@app/config/app.config';
import { DatabaseModule } from './database/database.module';
import WalletController from './api/controllers/wallets';
import { WalletService } from './services/wallet.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      load: [appConfig],
    }),
  ],
  controllers: [AppController, ...WalletController],
  providers: [AppService, WalletService],
})
export class AppModule {}
