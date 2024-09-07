import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { WalletEntity } from '@app/database/entities/wallet.entity';

export enum TransactionType {
  DEPOSIT = 'deposit',
  EXPIRED = 'expired',
  REFUND = 'refund',
  TOPUP = 'topup',
  WITHDRAW = 'withdraw',
}

@Entity('cpmatch_transactions')
export class TransactionEntity {
  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    name: 'wallet_id',
    type: 'int',
    nullable: false,
    unsigned: true,
  })
  walletId: number;

  @Column({
    name: 'service_id',
    type: 'int',
    nullable: false,
    unsigned: true,
  })
  serviceId: number;

  @Column({
    name: 'type_id',
    type: 'int',
    nullable: false,
    unsigned: true,
  })
  typeId: number;

  @Column({ name: 'type', type: 'varchar', length: 255, nullable: false })
  type: TransactionType;

  @Column({
    name: 'amount',
    type: 'bigint',
    nullable: false,
  })
  amount: number;

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
    nullable: false,
  })
  uuid: string;

  @Column({
    name: 'is_confirmed',
    type: 'tinyint',
    nullable: true,
    default: 0,
    unsigned: true,
  })
  isConfirmed: number;

  @Column({
    name: 'is_expired',
    type: 'tinyint',
    nullable: true,
    default: 0,
    unsigned: true,
  })
  isExpired: number;

  @Column({
    name: 'activated_at',
    type: 'date',
    nullable: true,
    default: null,
  })
  activatedAt: Date;

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

  @ManyToOne(() => WalletEntity, (wallet) => wallet.id)
  @JoinColumn({
    name: 'wallet_id',
    referencedColumnName: 'id',
  })
  wallet: WalletEntity;
}
