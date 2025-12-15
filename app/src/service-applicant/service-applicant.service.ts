// src/service-applicant/service-applicant.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CreateServiceApplicantDto } from './dto/create-service-applicant.dto';
import { UpdateServiceApplicantDto } from './dto/update-service-applicant.dto';
import { ServiceApplicant } from './entities/service-applicant.entity';
import { User } from '../users/entities/user.entity';
import { Service } from '../services/entities/service.entity';

@Injectable()
export class ServiceApplicantService {
  constructor(
    @InjectRepository(ServiceApplicant)
    private readonly serviceApplicantRepository: Repository<ServiceApplicant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceApplicantDto: CreateServiceApplicantDto): Promise<ServiceApplicant> {
    // Verificar que existan el trabajador y el servicio
    await this.validateRelations(createServiceApplicantDto);

    const serviceApplicant = this.serviceApplicantRepository.create({
      ...createServiceApplicantDto,
      status: createServiceApplicantDto.status || 'pending'
    });
    
    return await this.serviceApplicantRepository.save(serviceApplicant);
  }

  async findAll(): Promise<ServiceApplicant[]> {
    return await this.serviceApplicantRepository.find({
      relations: ['worker', 'service'],
      where: { deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ServiceApplicant> {
    const serviceApplicant = await this.serviceApplicantRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['worker', 'service'],
    });

    if (!serviceApplicant) {
      throw new NotFoundException(`Service applicant with ID "${id}" not found`);
    }

    return serviceApplicant;
  }

  async update(id: number, updateServiceApplicantDto: UpdateServiceApplicantDto): Promise<ServiceApplicant> {
    const existingApplicant = await this.findOne(id);
    
    // Si se están actualizando las relaciones, verificar que existan
    if (updateServiceApplicantDto.workerId || updateServiceApplicantDto.serviceId) {
      await this.validateRelations({
        workerId: updateServiceApplicantDto.workerId ?? existingApplicant.workerId,
        serviceId: updateServiceApplicantDto.serviceId ?? existingApplicant.serviceId,
      });
    }

    // Aplicar los cambios
    const updatedApplicant = {
      ...existingApplicant,
      ...updateServiceApplicantDto
    };

    return await this.serviceApplicantRepository.save(updatedApplicant);
  }

  async remove(id: number): Promise<void> {
    const result = await this.serviceApplicantRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service applicant with ID "${id}" not found`);
    }
  }

  private async validateRelations(dto: { 
    workerId?: number; 
    serviceId?: number;
  }): Promise<void> {
    if (dto.workerId) {
      const worker = await this.userRepository.findOne({ 
        where: { id_user: dto.workerId } 
      });
      if (!worker) {
        throw new NotFoundException(`Worker with ID "${dto.workerId}" not found`);
      }
    }

    if (dto.serviceId) {
      const service = await this.serviceRepository.findOne({ 
        where: { id: dto.serviceId } 
      });
      if (!service) {
        throw new NotFoundException(`Service with ID "${dto.serviceId}" not found`);
      }
    }
  }
}