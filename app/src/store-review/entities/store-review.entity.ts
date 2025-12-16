import { Store } from "src/stores/entities/store.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity('store_reviews')
export class StoreReview {
    @PrimaryGeneratedColumn('increment')
    id_store_review: number;

    @Column({ name: 'store_id' })
    userId: number;

    @Column({ name: 'city_id' })
    storeId: number;

    @Column()
    store_revew_like: boolean;

    @ManyToOne(() => Store, (store) => store.storeReviews)
    @JoinColumn({ name: 'store_id', referencedColumnName: 'id_store' })
    storeReviews: Store;

    @ManyToOne(() => User, (user) => user.storeReviewUser)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id_user' })
    storeReviewUser: User;

};