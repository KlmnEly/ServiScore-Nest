import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { UserWorker } from 'src/user-worker/entities/user-worker.entity';

@Entity('service_workers')
export class ServiceWorker {
  @PrimaryGeneratedColumn('increment')
  id_service_worker: number;

  @Column({ name: 'service_id' })
  serviceId: number;

  @Column({ name: 'worker_id' })
  workerId: number;

  @ManyToOne(() => Service, (service) => service.workerService)
  @JoinColumn({ name: 'service_id', referencedColumnName: 'id_service' })
  workerService: Service;

  @ManyToOne(() => UserWorker, (worker) => worker.serviceWorker)
  @JoinColumn({ name: 'service_id', referencedColumnName: 'id_service' })
  serviceWorker: UserWorker;

}