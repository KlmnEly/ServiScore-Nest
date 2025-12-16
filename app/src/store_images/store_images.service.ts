import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { CreateStoreImageDto } from './dto/create-store_image.dto';
import { UpdateStoreImageDto } from './dto/update-store_image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreImage } from './entities/store_image.entity';

// Service for managing store images
@Injectable()
export class StoreImagesService {
  constructor(
  @InjectRepository(StoreImage) private storeImageRepository: Repository<StoreImage>,
  ) {}
  //  Create a new store image
  create(createStoreImageDto: CreateStoreImageDto) {
    const StoreImage = this.storeImageRepository.create(createStoreImageDto);
    return this.storeImageRepository.save(StoreImage);
  }
  // Retrieve all store images
  findAll() {
    return this.storeImageRepository.find();
  }
  //  Retrieve a specific store image by ID
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.storeImageRepository.findOneBy({ id_store_image: id });
  }
  // Update an existing store image by ID
  update(@Param('id', ParseIntPipe) id: number, updateStoreImageDto: UpdateStoreImageDto) {
    return this.storeImageRepository.update(id, updateStoreImageDto);
  }
  // Delete a store image by ID
  async remove(@Param('id', ParseIntPipe) id: number) {
    const StoreImage = await this.findOne(id);
    return this.storeImageRepository.delete(id);
  }
}
