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
// import { StoreCategory } from '../../store_categories/entities/store_category.entity';
// import { Adress } from '../../adresses/entities/adress.entity';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn('increment')
  id_store: number;

  @Column({ name: 'store_category_id' })
  store_category_id: number;

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

  /*
  // --- RELATIONSHIPS (Uncomment when corresponding entities exist) ---

  @ManyToOne(() => StoreCategory, (category) => category.stores)
  @JoinColumn({ name: 'store_category_id' })
  category: StoreCategory;

  @OneToMany(() => Adress, (adress) => adress.store)
  adresses: Adress[];
  */

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}