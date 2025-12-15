import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreCategoryDto } from './dto/create-store-category.dto';
import { UpdateStoreCategoryDto } from './dto/update-store-category.dto';
import { StoreCategory } from './entities/store-category.entity';

@Injectable()
export class StoreCategoryService {
  constructor(
    @InjectRepository(StoreCategory)
    private readonly storeCategoryRepository: Repository<StoreCategory>,
  ) {}

  // Create a new store category
  async create(createStoreCategoryDto: CreateStoreCategoryDto): Promise<StoreCategory> {
    try {
      // Check if category with the same name already exists
      const existingCategory = await this.storeCategoryRepository.findOne({
        where: { name: createStoreCategoryDto.name },
      });

      if (existingCategory) {
        throw new ConflictException(`Category with name "${createStoreCategoryDto.name}" already exists.`);
      }

      // Create and save the new category
      const newCategory = this.storeCategoryRepository.create(createStoreCategoryDto);
      return await this.storeCategoryRepository.save(newCategory);

    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating store category.');
    }
  }

  // Get all active store categories
  async findAllActive(): Promise<StoreCategory[]> {
    try {
      const categories = await this.storeCategoryRepository.find({
        where: { isActive: true },
        order: { name: 'ASC' },
      });

      if (!categories || categories.length === 0) {
        return [];
      }

      return categories;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving store categories.');
    }
  }

  // Get all store categories (including inactive)
  async findAll(): Promise<StoreCategory[]> {
    try {
      return await this.storeCategoryRepository.find({
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving store categories.');
    }
  }

  // Get a single store category by ID
  async findOne(id: number): Promise<StoreCategory> {
    try {
      const category = await this.storeCategoryRepository.findOne({ where: { id } });

      if (!category) {
        throw new NotFoundException(`Store category with ID ${id} not found.`);
      }

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving store category.');
    }
  }

  // Update a store category
  async update(id: number, updateStoreCategoryDto: UpdateStoreCategoryDto): Promise<StoreCategory> {
    try {
      const category = await this.findOne(id);
      
      // Check if name is being updated and if it already exists
      if (updateStoreCategoryDto.name && updateStoreCategoryDto.name !== category.name) {
        const existingCategory = await this.storeCategoryRepository.findOne({
          where: { name: updateStoreCategoryDto.name },
        });

        if (existingCategory) {
          throw new ConflictException(`Category with name "${updateStoreCategoryDto.name}" already exists.`);
        }
      }

      // Update the category
      const updatedCategory = this.storeCategoryRepository.merge(category, updateStoreCategoryDto);
      return await this.storeCategoryRepository.save(updatedCategory);

    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating store category.');
    }
  }

  // Soft delete a store category
  async remove(id: number): Promise<void> {
    try {
      const result = await this.storeCategoryRepository.softDelete(id);
      
      if (result.affected === 0) {
        throw new NotFoundException(`Store category with ID ${id} not found.`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error deleting store category.');
    }
  }

  // Restore a soft-deleted store category
  async restore(id: number): Promise<StoreCategory> {
    try {
      const result = await this.storeCategoryRepository.restore(id);
      
      if (result.affected === 0) {
        throw new NotFoundException(`Cannot restore store category with ID ${id}. Not found or not deleted.`);
      }

      return await this.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error restoring store category.');
    }
  }
}