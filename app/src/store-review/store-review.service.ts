import { Injectable } from '@nestjs/common';
import { CreateStoreReviewDto } from './dto/create-store-review.dto';
import { UpdateStoreReviewDto } from './dto/update-store-review.dto';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { StoreReview } from './entities/store-review.entity';

// Service for managing store reviews
@Injectable()
export class StoreReviewService {
    constructor(
      @InjectRepository(StoreReview) private storeReviewRepository: Repository<StoreReview>,
    ) {}
    // Create a new store review
  create(createStoreReviewDto: CreateStoreReviewDto) {
    const storeReview = this.storeReviewRepository.create(createStoreReviewDto);
    return this.storeReviewRepository.save(storeReview);
  }
  //  Get all store reviews
  findAll() {
    return this.storeReviewRepository.find();
  }
  // Get store review by id
  findOne(id: number) {
    return this.storeReviewRepository.findOneBy({ id_worker_revew: id });
  }
  // Update a store review by id
  update(id: number, updateStoreReviewDto: UpdateStoreReviewDto) {
    return this.storeReviewRepository.update(id, updateStoreReviewDto);
  }
  // Delete a store review by id
 async remove(id: number) {
    const image = await this.findOne(id);
    return this.storeReviewRepository.delete(id);
  }
}
