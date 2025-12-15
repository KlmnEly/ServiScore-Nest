// src/worker-review/worker-review.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerReview } from './entities/worker-review.entity';
import { WorkerReviewService } from './worker-review.service';
import { WorkerReviewController } from './worker-review.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkerReview, User]),
  ],
  controllers: [WorkerReviewController],
  providers: [WorkerReviewService],
  exports: [WorkerReviewService],
})
export class WorkerReviewModule {}