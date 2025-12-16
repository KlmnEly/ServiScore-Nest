import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Status } from '../../status/entities/status.entity';
import { Store } from '../../stores/entities/store.entity';
import { ServiceWorker } from 'src/service-worker/entities/service-worker.entity';

@Entity('services')
export class Service {
  /**
   * Primary key for the Service entity.
   */
  @PrimaryGeneratedColumn('increment')
  id_service: number;

  /**
   * Foreign key referencing the ServiceCategory entity.
   */
  @Column({ name: 'service_category_id' })
  service_category_id: number;

  /**
   * Foreign key referencing the User (Provider) entity.
   */
  @Column({ name: 'user_id' })
  user_id: number;

  /**
   * Foreign key referencing the Status (e.g., pending, approved) entity.
   */
  @Column({ name: 'status_id' })
  status_id: number;

  /**
   * Foreign key referencing the Store entity (optional if service is tied to a physical store).
   */
  @Column({ name: 'store_id', nullable: true })
  store_id: number;

  /**
   * Title of the service offered.
   * @example "Advanced Web Development Consultation"
   */
  @Column({ length: 255 })
  service_title: string;

  /**
   * Detailed description of the service.
   * @example "One-hour consultation covering architecture and scalability."
   */
  @Column('text')
  service_description: string;

  /**
   * Price of the service. Stored as a decimal for precision.
   */
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  service_price: number;

  /**
   * Physical location or service area.
   * @example "Remote via Zoom" or "Barranquilla, Colombia"
   */
  @Column({ length: 255 })
  service_location: string;

  /**
   * Scheduled date and time for the service.
   */
  @Column({ type: 'timestamp' })
  service_datetime: Date;

  /**
   * Flag for soft deletion/activation. True means the service is active/visible.
   */
  @Column({ default: true, name: 'service_is_active' })
  service_is_active: boolean;

  /**
   * Timestamp of when the service record was created.
   */
  @CreateDateColumn({ type: 'timestamp' })
  service_created_at: Date;

  /**
   * Timestamp of the last update to the service record.
   */
  @UpdateDateColumn({ type: 'timestamp' })
  service_updated_at: Date;


  // --- RELATIONSHIPS (Uncomment when corresponding entities exist) ---

  @ManyToOne(() => User, (user) => user.services)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Store, (store) => store.services)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @ManyToOne(() => Status, (status) => status.services)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @OneToMany(() => ServiceWorker, (serviceWorker) => serviceWorker.workerService)
  workerService: ServiceWorker[];

}