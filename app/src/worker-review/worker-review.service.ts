// src/worker-review/worker-review.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CreateWorkerReviewDto } from './dto/create-worker-review.dto';
import { UpdateWorkerReviewDto } from './dto/update-worker-review.dto';
import { WorkerReview } from './entities/worker-review.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WorkerReviewService {
  constructor(
    @InjectRepository(WorkerReview)
    private readonly workerReviewRepository: Repository<WorkerReview>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createWorkerReview(createWorkerReviewDto: CreateWorkerReviewDto): Promise<WorkerReview> {
   
    await this.validateRelations(createWorkerReviewDto);

    const workerReview = this.workerReviewRepository.create(createWorkerReviewDto);
    return await this.workerReviewRepository.save(workerReview);
  }

  async findAllWorkerReviews(): Promise<WorkerReview[]> {
    return await this.workerReviewRepository.find({
      relations: ['worker', 'customer'],
      where: { deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  async findWorkerReviewById(id: number): Promise<WorkerReview> {
    const workerReview = await this.workerReviewRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['worker', 'customer'],
    });

    if (!workerReview) {
      throw new NotFoundException(`Worker review with ID "${id}" not found`);
    }

    return workerReview;
  }

  async updateWorkerReview(
    id: number, 
    updateWorkerReviewDto: UpdateWorkerReviewDto
  ): Promise<WorkerReview> {
    const existingReview = await this.findWorkerReviewById(id);
    

    if (updateWorkerReviewDto.workerId || updateWorkerReviewDto.customerId) {
      await this.validateRelations({
        workerId: updateWorkerReviewDto.workerId ?? existingReview.workerId,
        customerId: updateWorkerReviewDto.customerId ?? existingReview.customerId,
      });
    }

    
    const updatedReview = {
      ...existingReview,
      ...updateWorkerReviewDto
    };

    return await this.workerReviewRepository.save(updatedReview);
  }

  async deleteWorkerReviewById(id: number): Promise<void> {
    const result = await this.workerReviewRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Worker review with ID "${id}" not found`);
    }
  }

  async findByWorkerId(workerId: number): Promise<WorkerReview[]> {
    return await this.workerReviewRepository.find({
      where: { 
        workerId,
        deletedAt: IsNull() 
      },
      relations: ['customer'],
      order: { createdAt: 'DESC' },
    });
  }

  async getAverageRating(workerId: number): Promise<number> {
    const result = await this.workerReviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'average')
      .where('review.worker_id = :workerId', { workerId })
      .andWhere('review.deleted_at IS NULL')
      .getRawOne();

    return parseFloat(result.average) || 0;
  }

  private async validateRelations(dto: { 
    workerId?: number; 
    customerId?: number;
  }): Promise<void> {
    if (dto.workerId) {
      const worker = await this.userRepository.findOne({ 
        where: { id_user: dto.workerId } 
      });
      if (!worker) {
        throw new NotFoundException(`Worker with ID "${dto.workerId}" not found`);
      }
    }

    if (dto.customerId) {
      const customer = await this.userRepository.findOne({ 
        where: { id_user: dto.customerId } 
      });
      if (!customer) {
        throw new NotFoundException(`Customer with ID "${dto.customerId}" not found`);
      }
    }
  }
}