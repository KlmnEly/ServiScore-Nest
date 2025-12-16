import { Image } from "src/images/entities/image.entity";
import { Store } from "src/stores/entities/store.entity";
import { JoinColumn } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

// Entity definition for StoreImage
@Entity('storeImages')
export class StoreImage {
    @PrimaryGeneratedColumn('increment')
    id_store_image: number;

    @Column({ name: 'store_id' })
    storeId: number;

    @Column({ name: 'image_id' })
    imageId: number;

    @ManyToOne(() => Image, (image) => image.imageStores)
    @JoinColumn({ name: 'image_id', referencedColumnName: 'id_image' })
    imageStores: Image;

    @ManyToOne(() => Store, (store) => store.storeImages)
    @JoinColumn({ name: 'store_id', referencedColumnName: 'id_store' })
    storeImages: Store;

}
