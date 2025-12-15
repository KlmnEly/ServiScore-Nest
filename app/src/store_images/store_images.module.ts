import { Module } from '@nestjs/common';
import { StoreImagesService } from './store_images.service';
import { StoreImagesController } from './store_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { StoreImage } from './entities/store_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreImage])],
  controllers: [StoreImagesController],
  providers: [StoreImagesService],
})
export class StoreImagesModule {}
