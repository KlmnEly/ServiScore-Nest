import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Entity, OneToMany } from "typeorm";
import { Adress } from "../../adresses/entities/adress.entity";

// Entity definition for Country
@Entity('countries')
export class Country {

    @PrimaryGeneratedColumn('increment')
    id_country: number;

    @Column({ name: 'country_name' })
    country_name: string;
    // One-to-many relationship with Adress entity
    @OneToMany(() => Adress, adress => adress.country)
    addresses: Adress[];
}
