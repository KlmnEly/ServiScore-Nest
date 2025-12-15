// import { store } from "src/stores/entities/store.entity";
import { Image } from "src/images/entities/image.entity";
import { JoinColumn, ManyToMany } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity('userImages')
export class UserImage {
    @PrimaryGeneratedColumn('increment')
    id_user_image: number;

    @Column({ name: 'user_id' })
    user_id: number;

    @Column({ name: 'image_id' })
    image_id: number;

    @ManyToOne(() => Image, image => image.userImages, {
        nullable: false,
        onDelete: 'CASCADE',  
    })
    @JoinColumn({ name: 'image_id' })
    Image: Image;
    
    //future conections with store revews
    // @ManyToMany(() => Store_revew, storeRevew => storeRevew.userstoreRevews)
    // @JoinColumn({ name: 'storeRevew_id' })
    // storeRevews: storeRevew[];

}
