import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceCategory } from './entities/service-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceCategoryService {

    constructor(
        @InjectRepository(ServiceCategory)
        private readonly serviceCategoryRepository: Repository<ServiceCategory>,
    ) { }

    async create(createServiceCategoryDto: CreateServiceCategoryDto) {
        try {
            const newServiceCategory = this.serviceCategoryRepository.create(createServiceCategoryDto);
            return await this.serviceCategoryRepository.save(newServiceCategory);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException(`Category with name "${createServiceCategoryDto.name}" already exists.`);
            }
            throw new InternalServerErrorException('Error creating service category');
        }
    }

    async findAll() {
        try {
            const categories = await this.serviceCategoryRepository.find();
            if (!categories || categories.length === 0) {
                throw new NotFoundException('No service categories found');
            }
            return categories;
        } catch (error) {
            if (error.response?.statusCode) throw error;
            throw new InternalServerErrorException('Error fetching service categories');
        }
    }

    async findOne(@Param('id', ParseIntPipe) id: number) {
        try {
            const category = await this.serviceCategoryRepository.findOne({ where: { id_service_category: id } });
            if (!category) {
                throw new NotFoundException(`Service category with ID ${id} not found`);
            }
            return category;
        } catch (error) {
            if (error.response?.statusCode) throw error;
            throw new InternalServerErrorException('Error fetching service category');
        }
    }

    async update(@Param('id', ParseIntPipe) id: number, updateServiceCategoryDto: UpdateServiceCategoryDto) {
        const category = await this.findOne(id);

        try {
            await this.serviceCategoryRepository.update(id, updateServiceCategoryDto);
            return this.findOne(id);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException(`Category with name "${updateServiceCategoryDto.name}" already exists.`);
            }
            throw new InternalServerErrorException('Error updating service category');
        }
    }

    async remove(@Param('id', ParseIntPipe) id: number) {
        const category = await this.findOne(id);
        const newStatus = !category.isActive;

        try {
            await this.serviceCategoryRepository.update(id, { isActive: newStatus });
            return { message: `Service category ${id} has been ${newStatus ? 'activated' : 'deactivated'}` };
        } catch (error) {
            throw new InternalServerErrorException('Error updating category status');
        }
    }
}
