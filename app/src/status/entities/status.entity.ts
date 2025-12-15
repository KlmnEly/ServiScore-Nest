// src/status/entities/status.entity.ts
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('statuses')
export class Status {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', {
    length: 100,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column('text', {
    nullable: true,
  })
  description: string;

  @Column('varchar', {
    length: 50,
    nullable: true,
  })
  color: string;

  @Column('boolean', {
    default: true,
    name: 'is_active',
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAtStatus: Date;
}