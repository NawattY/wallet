import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { TransferEntity } from '@app/database/entities/transfer.entity';
import { TransactionEntity } from '@app/database/entities/transaction.entity';
import { EarnTransactionEntity } from '@app/database/entities/earn-transaction.entity';
import { BurnTransactionEntity } from '@app/database/entities/burn-transaction.entity';

@Entity('cpmatch_wallets')
export class WalletEntity {
  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    name: 'user_id',
    type: 'varchar',
    length: 50,
  })
  userId: string;

  @Column({
    name: 'service_id',
    type: 'int',
    unsigned: true,
  })
  serviceId: number;

  @Column({
    name: 'type_id',
    type: 'int',
    unsigned: true,
  })
  typeId: number;

  @Column({
    name: 'balance',
    type: 'bigint',
    default: 0,
    unsigned: false,
  })
  balance: number;

  @Column({
    name: 'earn_total',
    type: 'bigint',
    default: 0,
    unsigned: false,
  })
  earnTotal: number;

  @Column({
    name: 'burn_total',
    type: 'bigint',
    default: 0,
    unsigned: false,
  })
  burnTotal: number;

  @Column({ name: 'signature', type: 'varchar', length: 255, nullable: true })
  signature: string;

  @Column({ name: 'description', type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ name: 'is_active', type: 'tinyint', default: 1 })
  isActive: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  createdAt: Timestamp;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
    onUpdate: 'CURRENT_TIMESTAMP(0)',
  })
  updatedAt: Timestamp;

  @OneToMany(() => TransferEntity, (transfer) => transfer.fromWallet)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'from_wallet_id',
  })
  transfersOut: TransferEntity;

  @OneToMany(() => TransferEntity, (transfer) => transfer.toWallet)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'to_wallet_id',
  })
  transfersIn: TransferEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.wallet)
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'wallet_id',
  })
  transactions: TransactionEntity;

  @OneToMany(
    () => EarnTransactionEntity,
    (earnTransaction) => earnTransaction.wallet,
  )
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'wallet_uuid',
  })
  earnTransactions: EarnTransactionEntity;

  @OneToMany(
    () => BurnTransactionEntity,
    (burnTransaction) => burnTransaction.wallet,
  )
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'wallet_uuid',
  })
  burnTransactions: BurnTransactionEntity;
}
