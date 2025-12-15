// src/service-applicant/entities/service-applicant.entity.ts
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
import { Service } from '../../services/entities/service.entity';

@Entity('service_applicants')
export class ServiceApplicant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { nullable: true })
  message: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  proposedPrice: number;

  @Column('varchar', { length: 50, default: 'pending' })
  status: string; // pending, accepted, rejected

  // Relación con el trabajador que aplica
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'worker_id' })
  worker: User;

  @Column('int', { name: 'worker_id' })
  workerId: number;

  // Relación con el servicio
  @ManyToOne(() => Service, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column('int', { name: 'service_id' })
  serviceId: number;

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