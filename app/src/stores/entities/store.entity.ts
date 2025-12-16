
import { Adress } from 'src/adresses/entities/adress.entity';
import { Service } from 'src/services/entities/service.entity';
import { StoreCategory } from 'src/store-category/entities/store-category.entity';
import { StoreReview } from 'src/store-review/entities/store-review.entity';
import { StoreImage } from 'src/store_images/entities/store_image.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn('increment')
  id_store: number;

  @Column({ name: 'store_category_id' })
  storeCategoryId: number;

  @Column({ length: 255 })
  store_name: string;

  @Column('text')
  store_description: string;

  @Column({ length: 20 })
  store_phone: string;

  @Column({ default: 0 })
  store_total_favourites: number;

  @CreateDateColumn({ type: 'timestamp' })
  store_created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  store_updated_at: Date;

  @ManyToOne(() => StoreCategory, (storeCategory) => storeCategory.storeCategory)
  @JoinColumn({ name: 'store_category_id', referencedColumnName: 'id_store_category' })
  storeCategory: StoreCategory;

  @OneToMany(() => Adress, (adress) => adress.store)
  addresses: Adress[];

  // En la entidad Store
  @OneToMany(() => Service, (service) => service.store)
  services: Service[];

  @OneToMany(() => StoreImage, (storeImage) => storeImage.storeImages)
  storeImages: StoreImage[];

  @OneToMany(() => StoreReview, (storeReview) => storeReview.storeReviews)
  storeReviews: StoreReview[];

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}