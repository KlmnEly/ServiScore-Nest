import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ServiceWorker } from 'src/service-worker/entities/service-worker.entity';

@Entity('user_workers')
export class UserWorker {
    @PrimaryGeneratedColumn('increment')
        id_user_worker: number;

    @Column({name: 'user_id' })
    userId: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => ServiceWorker, (serviceWorker) => serviceWorker.serviceWorker)
    serviceWorker: ServiceWorker[];

    @Column('boolean', {
        default: true,
        name: 'is_active',
    })
    isActive: boolean;
};