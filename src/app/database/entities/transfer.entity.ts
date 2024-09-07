import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { WalletEntity } from '@app/database/entities/wallet.entity';
import { TransactionEntity } from '@app/database/entities/transaction.entity';

@Entity('cpmatch_transfers')
export class TransferEntity {
  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    name: 'from_wallet_id',
    type: 'int',
    nullable: false,
    unsigned: true,
  })
  fromWalletId: number;

  @Column({
    name: 'to_wallet_id',
    type: 'int',
    nullable: false,
    unsigned: true,
  })
  toWalletId: number;

  @Column({
    name: 'point_transaction_id',
    type: 'bigint',
    nullable: true,
    unsigned: true,
    default: null,
  })
  pointTransactionId: number;

  @Column({
    name: 'service_id',
    type: 'int',
    unsigned: true,
  })
  serviceId: number;

  @Column({ name: 'type', type: 'varchar', length: 255 })
  type: string;

  @Column({
    name: 'amount',
    type: 'bigint',
    unsigned: false,
  })
  amount: number;

  @Column({
    name: 'withdraw_id',
    type: 'int',
    unsigned: true,
  })
  withdrawId: number;

  @Column({
    name: 'deposit_id',
    type: 'int',
    unsigned: true,
  })
  depositId: number;

  @Column({
    name: 'meta',
    type: 'json',
    nullable: true,
  })
  meta: string;

  @Column({
    name: 'uuid',
    type: 'char',
    length: 36,
    unique: true,
  })
  uuid: string;

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

  @ManyToOne(() => WalletEntity, (wallet) => wallet.id)
  @JoinColumn({
    name: 'from_wallet_id',
    referencedColumnName: 'id',
  })
  fromWallet: WalletEntity;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.id)
  @JoinColumn({
    name: 'to_wallet_id',
    referencedColumnName: 'id',
  })
  toWallet: WalletEntity;

  @OneToOne(() => TransactionEntity, (transaction) => transaction.id)
  @JoinColumn({
    name: 'withdraw_id',
    referencedColumnName: 'id',
  })
  withdrawTransaction: TransactionEntity;

  @OneToOne(() => TransactionEntity, (transaction) => transaction.id)
  @JoinColumn({
    name: 'deposit_id',
    referencedColumnName: 'id',
  })
  depositTransaction: TransactionEntity;
}
