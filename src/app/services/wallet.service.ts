import { WalletEntity } from '@app/database/entities/wallet.entity';
import { WalletException } from '@app/exceptions/wallet.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,
  ) {}

  async findByUserId(userId: string): Promise<WalletEntity> {
    const query = this.walletRepository
      .createQueryBuilder('wallets')
      .where('wallets.userId = :userId', { userId });

    const wallet = await query.getOne();

    if (!wallet) {
      throw WalletException.notFound();
    }

    return wallet;
  }
}
