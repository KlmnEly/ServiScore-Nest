// src/worker-review/dto/update-worker-review.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkerReviewDto } from './create-worker-review.dto';

export class UpdateWorkerReviewDto extends PartialType(CreateWorkerReviewDto) {}