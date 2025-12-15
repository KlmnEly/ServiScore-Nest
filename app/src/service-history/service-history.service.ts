// src/service-history/service-history.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CreateServiceHistoryDto } from './dto/create-service-history.dto';
import { UpdateServiceHistoryDto } from './dto/update-service-history.dto';
import { ServiceHistory } from './entities/service-history.entity';
import { User } from '../users/entities/user.entity';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class ServiceHistoryService {
  constructor(
    @InjectRepository(ServiceHistory)
    private readonly serviceHistoryRepository: Repository<ServiceHistory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async createServiceHistory(createServiceHistoryDto: CreateServiceHistoryDto): Promise<ServiceHistory> {
    //verify that customer and worker alredy exist
    await this.validateRelations(createServiceHistoryDto);

    const serviceHistory = this.serviceHistoryRepository.create(createServiceHistoryDto);
    return await this.serviceHistoryRepository.save(serviceHistory);
  }

  async findAllServiceHistories(): Promise<ServiceHistory[]> {
    return await this.serviceHistoryRepository.find({
      relations: ['customer', 'worker', 'status'],
      where: { deletedAt: IsNull() },
      order: { startTime: 'DESC' },
    });
  }

  async findServiceHistoryById(id: number): Promise<ServiceHistory> {
    const serviceHistory = await this.serviceHistoryRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['customer', 'worker', 'status'],
    });

    if (!serviceHistory) {
      throw new NotFoundException(`Service history with ID "${id}" not found`);
    }

    return serviceHistory;
  }

  async updateServiceHistory(id: number, updateServiceHistoryDto: UpdateServiceHistoryDto): Promise<ServiceHistory> {
    // Verify the history alredy exist
    const existingService = await this.findServiceHistoryById(id);
    
    if (updateServiceHistoryDto.customerId || 
        updateServiceHistoryDto.workerId || 
        updateServiceHistoryDto.statusId) {
      await this.validateRelations({
        customerId: updateServiceHistoryDto.customerId ?? existingService.customerId,
        workerId: updateServiceHistoryDto.workerId ?? existingService.workerId,
        statusId: updateServiceHistoryDto.statusId ?? existingService.statusId,
      });
    }

    const updatedService = {
      ...existingService,
      ...updateServiceHistoryDto,
    };

    return await this.serviceHistoryRepository.save(updatedService);
  }

  async DeleteServiceHistoryById(id: number): Promise<void> {
    const result = await this.serviceHistoryRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service history with ID "${id}" not found`);
    }
  }

  private async validateRelations(dto: { 
    customerId?: number; 
    workerId?: number; 
    statusId?: number;
  }): Promise<void> {
    if (dto.customerId) {
      const customer = await this.userRepository.findOne({ where: { id_user: dto.customerId } });
      if (!customer) {
        throw new NotFoundException(`Customer with ID "${dto.customerId}" not found`);
      }
    }

    if (dto.workerId) {
      const worker = await this.userRepository.findOne({ where: { id_user: dto.workerId } });
      if (!worker) {
        throw new NotFoundException(`Worker with ID "${dto.workerId}" not found`);
      }
    }

    if (dto.statusId) {
      const status = await this.statusRepository.findOne({ where: { id: dto.statusId } });
      if (!status) {
        throw new NotFoundException(`Status with ID "${dto.statusId}" not found`);
      }
    }
  }
}