// src/service-worker/entities/service-worker.entity.ts
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
import { Service } from '../../services/entities/service.entity';
import { User } from '../../users/entities/user.entity';

@Entity('service_workers')
export class ServiceWorker {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 50, default: 'active' })
  status: string; // active, inactive, on_leave

  @Column('boolean', { default: true })
  isActive: boolean;

  // Relación con el servicio
  @ManyToOne(() => Service, (service) => service.serviceWorker, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  services: Service;

  @Column('int', { name: 'service_id' })
  serviceId: number;

  // Relación con el trabajador
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'worker_id' })
  worker: User;

  @Column('int', { name: 'worker_id' })
  workerId: number;

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