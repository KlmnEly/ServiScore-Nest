// src/service-worker/service-worker.service.ts
import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CreateServiceWorkerDto } from './dto/create-service-worker.dto';
import { UpdateServiceWorkerDto } from './dto/update-service-worker.dto';
import { ServiceWorker } from './entities/service-worker.entity';
import { Service } from '../services/entities/service.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ServiceWorkerService {
  constructor(
    @InjectRepository(ServiceWorker)
    private readonly serviceWorkerRepository: Repository<ServiceWorker>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createServiceWorker(createServiceWorkerDto: CreateServiceWorkerDto): Promise<ServiceWorker> {
    await this.validateRelations(createServiceWorkerDto);

    const serviceWorker = this.serviceWorkerRepository.create({...createServiceWorkerDto});
    
    return await this.serviceWorkerRepository.save(serviceWorker);
  }

  async findAllServiceWorkers(): Promise<ServiceWorker[]> {
    return await this.serviceWorkerRepository.find({
      relations: ['service', 'worker']
    });
  }

  async findServiceWorkerById(@Param('id', ParseIntPipe) id: number): Promise<ServiceWorker> {
    const serviceWorker = await this.serviceWorkerRepository.findOne({
      where: { id_service_worker: id },
      relations: ['service', 'worker'],
    });

    if (!serviceWorker) {
      throw new NotFoundException(`Service worker with ID "${id}" not found`);
    }

    return serviceWorker;
  }

  async updateServiceWorker(
    @Param('id', ParseIntPipe) id: number, 
    updateServiceWorkerDto: UpdateServiceWorkerDto
  ): Promise<ServiceWorker> {
    const existingWorker = await this.findServiceWorkerById(id);
    
    if (updateServiceWorkerDto.serviceId || updateServiceWorkerDto.workerId) {
      await this.validateRelations({
        serviceId: updateServiceWorkerDto.serviceId ?? existingWorker.serviceId,
        workerId: updateServiceWorkerDto.workerId ?? existingWorker.workerId,
      });
    }


    const updatedWorker = {
      ...existingWorker,
      ...updateServiceWorkerDto
    };

    return await this.serviceWorkerRepository.save(updatedWorker);
  }

  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.serviceWorkerRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service worker with ID "${id}" not found`);
    }
  }

  private async validateRelations(dto: { 
    serviceId?: number; 
    workerId?: number;
  }): Promise<void> {
    if (dto.serviceId) {
      const service = await this.serviceRepository.findOne({ 
        where: { id_service: dto.serviceId } 
      });
      if (!service) {
        throw new NotFoundException(`Service with ID "${dto.serviceId}" not found`);
      }
    }

    if (dto.workerId) {
      const worker = await this.userRepository.findOne({ 
        where: { id_user: dto.workerId } 
      });
      if (!worker) {
        throw new NotFoundException(`Worker with ID "${dto.workerId}" not found`);
      }
    }
  }
}