import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

// Service for managing images
@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private imagesRepository: Repository<Image>,
  ) {}
  // Create a new image
  create(createImageDto: CreateImageDto) {
    const image = this.imagesRepository.create(createImageDto);
    return this.imagesRepository.save(image);
  }
  // Get all images
  findAll() {
    return this.imagesRepository.find();
  }
  // Get image by id
  findOne(id: number) {
    return this.imagesRepository.findOneBy({ id_image: id });
  }
  // Update an image by id
  update(id: number, updateImageDto: UpdateImageDto) {
    return this.imagesRepository.update(id, updateImageDto);
  }
  // Delete an image by id
 async remove(id: number) {
    const image = await this.findOne(id);
    return this.imagesRepository.delete(id);
  }
}
