import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('user_workers')
export class UserWorker {
    @Column('int', { primary: true, name: 'user_id' })
    userId: number;

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column('boolean', {
        default: true,
        name: 'is_active',
    })
    isActive: boolean;
};