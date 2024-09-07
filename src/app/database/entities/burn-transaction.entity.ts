import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { WalletEntity } from '@app/database/entities/wallet.entity';
import { BurnTransactionItemEntity } from '@app/database/entities/burn-transaction-item.entity';

export enum BurnTransactionStatus {
  COMPLETED = 'completed',
  REFUND = 'refund',
}

@Entity('cpmatch_burn_transactions')
export class BurnTransactionEntity {
  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    name: 'service_id',
    type: 'int',
    nullable: false,
    unsigned: true,
  })
  serviceId: number;

  @Column({
    name: 'transactions_id',
    type: 'bigint',
    nullable: false,
    unsigned: true,
  })
  transactionId: number;

  @Column({
    name: 'wallet_uuid',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  walletUuid: string;

  @Column({
    name: 'title',
    type: 'longtext',
    nullable: false,
  })
  title: string;

  @Column({
    name: 'point',
    type: 'bigint',
    nullable: false,
    unsigned: true,
  })
  point: number;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 50,
    nullable: false,
    default: BurnTransactionStatus.COMPLETED,
  })
  status: BurnTransactionStatus;

  @Column({
    name: 'ref_code',
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  refCode: string;

  @Column({
    name: 'expired_at',
    type: 'date',
    nullable: true,
    default: null,
  })
  expiredAt: Date;

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

  @ManyToOne(() => WalletEntity, (wallet) => wallet.userId)
  @JoinColumn({
    name: 'wallet_uuid',
    referencedColumnName: 'userId',
  })
  wallet: WalletEntity;

  @OneToMany(
    () => BurnTransactionItemEntity,
    (burnTransactionItem) => burnTransactionItem.burnTransaction,
  )
  @JoinColumn({
    name: 'id',
    referencedColumnName: 'burn_transaction_id',
  })
  burnTransactionItems: BurnTransactionItemEntity;
}
