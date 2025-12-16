import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Entity, OneToMany } from "typeorm";
import { Adress } from "../../adresses/entities/adress.entity";

// Entity definition for Country
@Entity('countries')
export class Country {

    @PrimaryGeneratedColumn('increment')
    id_country: number;

    @Column()
    country_name: string;

    @OneToMany(() => Adress, adress => adress.country)
    addresses: Adress[];

}
