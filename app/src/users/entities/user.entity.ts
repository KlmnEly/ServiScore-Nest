import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Access } from '../../accesses/entities/access.entity';
import { Service } from 'src/services/entities/service.entity';
import { StoreReview } from 'src/store-review/entities/store-review.entity';

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn('increment')
  id_user: number;

  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @Column({ type: 'varchar', length: 100 })
  last_name: string;

  @Column({ name: 'access_id' })
  accessId: number;

  @OneToOne(() => Access)
  @JoinColumn({ name: 'access_id' })
  access: Access;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  // En la entidad User
  @OneToMany(() => Service, (service) => service.user)
  services: Service[];

  @OneToMany(() => StoreReview, (storeReview) => storeReview.storeReviewUser)
  storeReviewUser: StoreReview[];
}