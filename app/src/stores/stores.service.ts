// src/stores/stores.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  /**
   * Creates a new store record in the database.
   * @param createStoreDto Data to create the new store.
   * @returns The newly created Store entity.
   */
  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const store = this.storeRepository.create(createStoreDto);
    return await this.storeRepository.save(store);
  }

  /**
   * Retrieves all store records.
   * @returns An array of Store entities.
   */
  async findAll(): Promise<Store[]> {
    return await this.storeRepository.find();
  }

  /**
   * Retrieves a single store by its ID.
   * @param id The ID of the store to find.
   * @returns The found Store entity.
   * @throws NotFoundException if the store does not exist.
   */
  async findOne(id: number): Promise<Store> {
    const store = await this.storeRepository.findOne({ where: { id_store: id } });
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    return store;
  }

  /**
   * Updates an existing store record.
   * @param id The ID of the store to update.
   * @param updateStoreDto Data to update the store.
   * @returns The updated Store entity.
   * @throws NotFoundException if the store does not exist.
   */
  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    const store = await this.findOne(id); // Reuses findOne to check existence

    // Applies the updates and saves
    Object.assign(store, updateStoreDto);
    return await this.storeRepository.save(store);
  }


  async remove(id: number) {
    const store = await this.storeRepository.findOneBy({ id_store: id });

    if (!store) {
      throw new NotFoundException(`store with id ${id} not found.`);
    }

    // Toggle isActive state
    const newIsActiveState = !store.isActive;

    await this.storeRepository.update(id, { isActive: newIsActiveState });

    return { message: `store with id ${id} has been ${newIsActiveState ? 'activated' : 'deactivated'}.` };
  }
}