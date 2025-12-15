// src/worker-review/entities/worker-review.entity.ts
import { 
  Column, 
  CreateDateColumn, 
  DeleteDateColumn, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('worker_reviews')
export class WorkerReview {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int')
  rating: number; // 1-5 estrellas

  @Column('text', { nullable: true })
  comment: string;

  // Relación con el trabajador que está siendo calificado
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'worker_id' })
  worker: User;

  @Column('int', { name: 'worker_id' })
  workerId: number;

  // Relación con el cliente que hace la reseña
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @Column('int', { name: 'customer_id' })
  customerId: number;

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
  deletedAt: Date;
}