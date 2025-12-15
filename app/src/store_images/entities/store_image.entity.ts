// import { store } from "src/stores/entities/store.entity";
import { Image } from "src/images/entities/image.entity";
import { JoinColumn } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

// Entity definition for StoreImage
@Entity('storeImages')
export class StoreImage {
    @PrimaryGeneratedColumn('increment')
    id_store_image: number;

    @Column({ name: 'store_id'})
    store_id: number;

    @Column({ name: 'image_id' })
    image_id: number;
    
    @ManyToOne(() => Image, image => image.storeImages, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'image_id' })
    Image: Image;
    // Future connection with store entity
    // @ManyToOne(() => store, store => store.storeImages, {
    //     nullable: false,
    //     onDelete: 'CASCADE',
    // })
    // @JoinColumn({ name: 'store_id' })
    // store: store;

}
