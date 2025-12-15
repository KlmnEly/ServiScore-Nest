import { City } from "../../cities/entities/city.entity";
import { Country } from "../..//countries/entities/country.entity";
import { StoreImage } from "../../store_images/entities/store_image.entity";
import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Store } from "src/stores/entities/store.entity";

// Entity definition for Adress
@Entity('adresses')
export class Adress {
    @PrimaryGeneratedColumn('increment')
    id_adress: number;

    @Column({ name: 'store_id' })
    store_id: number;

    @Column({ name: 'city_id' })
    city_id: number;

    @Column({ name: 'country_id' })
    country_id: number;

    @ManyToOne(() => Store, (store) => store.adresses, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'store_id' })
    @JoinColumn({ name: 'store_id' })
    store: StoreImage;

    @ManyToOne(() => Country, country => country.addresses, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'country_id' })
    country: Country;

    @ManyToOne(() => City, city => city.addresses, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'city_id' })
    city: City;
};