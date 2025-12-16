// src/services/services.service.ts

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) { }

  /**
   * Creates a new service record.
   * @param createServiceDto Data to create the new service.
   * @returns The newly created Service entity.
   */
  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    try {
      const service = this.serviceRepository.create(createServiceDto);
      return await this.serviceRepository.save(service);
    } catch (error) {
      // error without control is → 500
      throw new InternalServerErrorException(
        'Error creating service',
      );
    }
  }

  /**
   * Retrieves all active service records.
   * @returns An array of active Service entities.
   */
  async findAll(): Promise<Service[]> {
    return await this.serviceRepository.find({ where: { service_is_active: true } });
  }

  /**
   * Retrieves a single service by its ID.
   * @param id The ID of the service to find.
   * @returns The found Service entity.
   * @throws NotFoundException if the service does not exist.
   */
  async findOne(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOne({ where: { id_service: id } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found.`);
    }
    return service;
  }

  /**
   * Updates an existing service record.
   * @param id The ID of the service to update.
   * @param updateServiceDto Data to update the service.
   * @returns The updated Service entity.
   * @throws NotFoundException if the service does not exist.
   */
  async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const service = await this.findOne(id); // Reuses findOne to check existence

    // Applies the updates and saves
    Object.assign(service, updateServiceDto);
    return await this.serviceRepository.save(service);
  }

  /**
   * Performs a soft delete (deactivation/activation) on a service record.
   * Instead of physical deletion, it toggles the 'service_is_active' flag.
   * @param id The ID of the service to toggle.
   * @returns A message indicating the new state (activated/deactivated).
   * @throws NotFoundException if the service does not exist.
   */
  async remove(id: number): Promise<{ message: string }> {
    const service = await this.serviceRepository.findOneBy({ id_service: id });

    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found.`);
    }

    // Toggle isActive state
    const newIsActiveState = !service.service_is_active;

    await this.serviceRepository.update(id, { service_is_active: newIsActiveState });

    return {
      message: `Service with id ${id} has been ${newIsActiveState ? 'activated' : 'deactivated'}.`
    };
  }
}