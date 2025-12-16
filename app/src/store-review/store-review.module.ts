import { Module } from '@nestjs/common';
import { StoreReviewService } from './store-review.service';
import { StoreReviewController } from './store-review.controller';
import {StoreReview} from './entities/store-review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StoreReview])],
  controllers: [StoreReviewController],
  providers: [StoreReviewService],
})
export class StoreReviewModule {}
