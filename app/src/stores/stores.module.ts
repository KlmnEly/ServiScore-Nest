import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store } from './entities/store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/common/cloudinary/cloudinary.module';
import { StoreCategory } from 'src/store-category/entities/store-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store, StoreCategory]),
    CloudinaryModule
  ],
  providers: [StoresService],
  controllers: [StoresController]
})
export class StoresModule { }
