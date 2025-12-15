// src/users/users.service.ts

import { Injectable, NotFoundException, InternalServerErrorException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    // 💡 Inyectamos el Repositorio de TypeORM
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto);

      const savedUser = await this.userRepository.save(newUser);

      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error);

      throw new InternalServerErrorException('Error al guardar la entidad de usuario.');
    }
  }

  async getAllActiveUsers() {
    try {
      const users = await this.userRepository.find({
        where: {
          isActive: true
        }
      });

      if (!users || users.length === 0) {
        throw new NotFoundException('No users found');
      }

      return users;
    } catch (err: any) {
      if (err.response?.statusCode) throw err;
      throw new InternalServerErrorException('Error fetching users');
    }
  }

  async getAll() {
    try {
      const users = await this.userRepository.find();

      if (!users || users.length === 0) {
        throw new NotFoundException('No users found.');
      }

      return users;
    } catch (err: any) {
      if (err.response?.statusCode) throw err;
      throw new InternalServerErrorException('Error fetching users.');
    }
  }

  async getById(id: number) {
    if (!id || id <= 0) {
      throw new BadRequestException('A valid id is required.');
    }

    try {
      const user = await this.userRepository.findOne({
        where: {
          id_user: id,
          isActive: true
        },
      });

      if (!user) {
        throw new NotFoundException(`user with id ${id} not found.`);
      }

      return user;
    } catch (err: any) {
      if (err.response?.statusCode) throw err;
      throw new InternalServerErrorException('Error fetching user by id.');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!id) {
      throw new BadRequestException('ID not found.');
    }

    const result = await this.userRepository.update(id, updateUserDto);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return this.userRepository.findOneBy({ id_user: id });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id_user: id });

    if (!user) {
      throw new NotFoundException(`Role with id ${id} not found.`);
    }

    // Toggle isActive state
    const newIsActiveState = !user.isActive;

    await this.userRepository.update(id, { isActive: newIsActiveState });

    return { message: `User with id ${id} has been ${newIsActiveState ? 'activated' : 'deactivated'}.` };
  }
}