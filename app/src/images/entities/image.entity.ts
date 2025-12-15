// import { User_image } from "./user_image.entity";
import { UserImage } from "src/user_images/entities/user_image.entity";
import { StoreImage } from "../../store_images/entities/store_image.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Entity definition for Image
@Entity('images')
export class Image {
    @PrimaryGeneratedColumn('increment')
    image_id: number;

    @Column({ name: 'image_url' })
    image_url: string;

    @OneToMany(() => StoreImage, store_image => store_image.Image)
    storeImages: StoreImage[];

    @OneToMany(() => UserImage, user_image => user_image.Image)
    userImages: UserImage[];


}
