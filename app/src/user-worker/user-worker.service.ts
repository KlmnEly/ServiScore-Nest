import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserWorkerDto } from './dto/create-user-worker.dto';
import { UpdateUserWorkerDto } from './dto/update-user-worker.dto';
import { UserWorker } from './entities/user-worker.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class UserWorkerService {
  constructor(
    @InjectRepository(UserWorker)
    private readonly userWorkerRepository: Repository<UserWorker>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Create a new worker user
   * @param createUserWorkerDto - Data to create worker user
   * @returns Created worker user
   */
  async createUserWorker(createUserWorkerDto: CreateUserWorkerDto): Promise<UserWorker> {
    // Check if user exists
    const user = await this.userRepository.findOne({ 
      where: { id_user: createUserWorkerDto.userId } 
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID "${createUserWorkerDto.userId}" not found`);
    }

    // Check if worker profile already exists
    const existingUserWorker = await this.userWorkerRepository.findOne({
      where: { userId: createUserWorkerDto.userId }
    });

    if (existingUserWorker) {
      throw new NotFoundException(`Worker profile for user ID "${createUserWorkerDto.userId}" already exists`);
    }

    const userWorker = this.userWorkerRepository.create({
      ...createUserWorkerDto,
      isActive: createUserWorkerDto.isActive ?? true
    });

    return await this.userWorkerRepository.save(userWorker);
  }

  /**
   * Find all active worker users
   * @returns List of all active worker users
   */
  async findAllUserWorkers(): Promise<UserWorker[]> {
    return await this.userWorkerRepository.find({
      where: { isActive: true },
      relations: ['user']
    });
  }

  /**
   * Find a worker user by ID
   * @param id - Worker user ID
   * @returns Found worker user
   */
  async findUserWorkerById(id: number): Promise<UserWorker> {
    const userWorker = await this.userWorkerRepository.findOne({
      where: { userId: id },
      relations: ['user']
    });

    if (!userWorker) {
      throw new NotFoundException(`Worker with user ID "${id}" not found`);
    }

    return userWorker;
  }

  /**
   * Update a worker user
   * @param id - Worker user ID
   * @param updateUserWorkerDto - Data to update
   * @returns Updated worker user
   */
  async updateUserWorker(id: number, updateUserWorkerDto: UpdateUserWorkerDto): Promise<UserWorker> {
    const userWorker = await this.userWorkerRepository.preload({
      userId: id,
      ...updateUserWorkerDto
    });

    if (!userWorker) {
      throw new NotFoundException(`Worker with user ID "${id}" not found`);
    }

    return await this.userWorkerRepository.save(userWorker);
  }

  /**
   * Remove a worker user (soft delete)
   * @param id - Worker user ID
   */
  async removeUserWorkerById(id: number): Promise<void> {
    const result = await this.userWorkerRepository.update(
      { userId: id },
      { isActive: false }
    );

    if (result.affected === 0) {
      throw new NotFoundException(`Worker with user ID "${id}" not found`);
    }
  }
}