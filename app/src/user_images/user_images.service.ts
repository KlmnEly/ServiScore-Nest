import { Injectable } from '@nestjs/common';
import { CreateUserImageDto } from './dto/create-user_image.dto';
import { UpdateUserImageDto } from './dto/update-user_image.dto';
import { UserImage } from './entities/user_image.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Service for managing user images
@Injectable()
export class UserImagesService {
  constructor(
    @InjectRepository(UserImage) private userImageRepository: Repository<UserImage>,
  ) { }
  //  Create a new user image
  create(createUserImageDto: CreateUserImageDto) {
    const userImage = this.userImageRepository.create(createUserImageDto);
    return this.userImageRepository.save(userImage);
  }
  // Retrieve all user images
  findAll() {
    return this.userImageRepository.find();
  }
  //  Retrieve a specific user image by ID
  findOne(id: number) {
    return this.userImageRepository.findOneBy({ id_user_image: id });
  }
  // Update an existing user image by ID
  update(id: number, updateUserImageDto: UpdateUserImageDto) {
    return this.userImageRepository.update(id, updateUserImageDto);
  }
  // Delete a user image by ID
  async remove(id: number) {
    const userImage = await this.findOne(id);
    return this.userImageRepository.delete(id);
  }
}
