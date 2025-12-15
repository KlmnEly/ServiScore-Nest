import { Module } from '@nestjs/common';
import { UserImagesService } from './user_images.service';
import { UserImagesController } from './user_images.controller';
import { UserImage } from './entities/user_image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserImage])],
  controllers: [UserImagesController],
  providers: [UserImagesService],
})
export class UserImagesModule { }
