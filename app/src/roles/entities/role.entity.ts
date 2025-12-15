
import { Access } from "../../accesses/entities/access.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('increment')
    id_role: number;

    @Column({ unique: true })
    name: string;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @OneToMany(() => Access, (access) => access.role)
    accesses: Access[];
}