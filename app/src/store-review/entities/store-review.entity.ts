import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity('store_reviews')
export class StoreReview {
    @PrimaryGeneratedColumn('increment')
    id_worker_revew: number;

    @Column({ name: 'store_id' })
    user_id: number;

    @Column({ name: 'city_id' })
    store_id: number;

    @Column({ name: 'country_id' })
    store_revew_like: string;

    // Future connection with store entity
    // @ManyToOne(() => Store, (store) => store.adresses, {
    //     nullable: false,
    //     onDelete: 'CASCADE'
    // })
    // @JoinColumn({ name: 'store_id' })
    // @JoinColumn({ name: 'store_id' })
    // store: StoreImage;

    @ManyToMany(() => StoreReview)
    @JoinTable({
        name: 'store_reviews',
    })
    store_reviews: StoreReview[];
};