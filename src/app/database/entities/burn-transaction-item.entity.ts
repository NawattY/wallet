import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { EarnTransactionEntity } from '@app/database/entities/earn-transaction.entity';
import { BurnTransactionEntity } from '@app/database/entities/burn-transaction.entity';

export enum BurnTransactionStatus {
  COMPLETED = 'completed',
  REFUND = 'refund',
}

@Entity('cpmatch_burn_transactions_item')
export class BurnTransactionItemEntity {
  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    name: 'burn_transaction_id',
    type: 'bigint',
    nullable: false,
    unsigned: true,
  })
  burnTransactionId: number;

  @Column({
    name: 'earn_transaction_id',
    type: 'bigint',
    nullable: false,
    unsigned: true,
  })
  earnTransactionId: number;

  @Column({
    name: 'point',
    type: 'bigint',
    nullable: false,
    unsigned: true,
  })
  point: number;

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

  @ManyToOne(
    () => EarnTransactionEntity,
    (earnTransaction) => earnTransaction.id,
  )
  @JoinColumn({
    name: 'earn_transaction_id',
    referencedColumnName: 'id',
  })
  earnTransaction: EarnTransactionEntity;

  @ManyToOne(
    () => BurnTransactionEntity,
    (burnTransaction) => burnTransaction.id,
  )
  @JoinColumn({
    name: 'burn_transaction_id',
    referencedColumnName: 'id',
  })
  burnTransaction: EarnTransactionEntity;
}
