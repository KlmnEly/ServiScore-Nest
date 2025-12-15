import { Role } from "../../roles/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('accesses')
export class Access {
    @PrimaryGeneratedColumn('increment')
    id_access: number;

    @Column({ name: 'role_id', default: 1 })
    roleId: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @ManyToOne(() => Role, (role) => role.accesses, {
        nullable: false,
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'role_id' })
    role: Role;
}
