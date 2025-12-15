import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateStoreCategoryDto } from './dto/create-store-category.dto';
import { UpdateStoreCategoryDto } from './dto/update-store-category.dto';
import { StoreCategory } from './entities/store-category.entity';

@Injectable()
export class StoreCategoryService {
  constructor(
    @InjectRepository(StoreCategory)
    private readonly storeCategoryRepository: Repository<StoreCategory>,
  ) {}

  async create(createStoreCategoryDto: CreateStoreCategoryDto): Promise<StoreCategory> {
    const category = this.storeCategoryRepository.create(createStoreCategoryDto);
    return await this.storeCategoryRepository.save(category);
  }

  async findAll(): Promise<StoreCategory[]> {
    return await this.storeCategoryRepository.find({
      where: { deletedAt:   IsNull() },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<StoreCategory> {
    const category = await this.storeCategoryRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!category) {
      throw new NotFoundException(`Store category with ID "${id}" not found`);
    }

    return category;
  }

  async update(
    id: string,
    updateStoreCategoryDto: UpdateStoreCategoryDto,
  ): Promise<StoreCategory> {
    const category = await this.findOne(id);
    
    // Actualizar solo las propiedades que vienen en el DTO
    Object.assign(category, updateStoreCategoryDto);
    
    return await this.storeCategoryRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    // Soft delete
    const result = await this.storeCategoryRepository.softDelete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Store category with ID "${id}" not found`);
    }
  }

  // Método para restaurar una categoría eliminada lógicamente
  async restore(id: string): Promise<StoreCategory> {
    await this.storeCategoryRepository.restore(id);
    return await this.findOne(id);
  }
}
