import { City } from "../../cities/entities/city.entity";
import { Country } from "../..//countries/entities/country.entity";
import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Store } from "src/stores/entities/store.entity";

// Entity definition for Adress
@Entity('adresses')
export class Adress {
    @PrimaryGeneratedColumn('increment')
    id_adress: number;

    @Column({ name: 'store_id' })
    storeId: number;

    @Column({ name: 'city_id' })
    cityId: number;

    @Column({ name: 'country_id' })
    countryId: number;

    @ManyToOne(() => City, (city) => city.addresses)
    @JoinColumn({ name: 'city_id', referencedColumnName: 'id_city' })
    city: City;

    @ManyToOne(() => Store, (store) => store.addresses)
    @JoinColumn({ name: 'store_id', referencedColumnName: 'id_store' })
    store: Store;

    @ManyToOne(() => Country, (country) => country.addresses)
    @JoinColumn({ name: 'country_id', referencedColumnName: 'id_country' })
    country: Country;
};