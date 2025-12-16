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
import { Status } from '../../status/entities/status.entity';

@Entity('service_histories')
export class ServiceHistory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('timestamp with time zone', { name: 'start_time' })
  startTime: Date;

  @Column('timestamp with time zone', { name: 'end_time', nullable: true })
  endTime: Date;

  // relation with the client
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @Column('int', { name: 'customer_id' })
  customerId: number;

  // relation with the worker
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'worker_id' })
  worker: User;

  @Column('int', { name: 'worker_id' })
  workerId: number;

  //relation with the status
  @ManyToOne(() => Status, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @Column('int', { name: 'status_id' })
  statusId: number;

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