import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Adress } from "../../adresses/entities/adress.entity";

// Entity definition for City
@Entity('cities')
export class City {
    @PrimaryGeneratedColumn('increment')
    id_city: number;

    @Column()
    city_name: string;

    @OneToMany(() => Adress, (adress) => adress.city)
    addresses: Adress[];
}
