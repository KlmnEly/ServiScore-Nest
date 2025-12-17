import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { CloudinaryModule } from 'src/common/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    CloudinaryModule
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule { }
