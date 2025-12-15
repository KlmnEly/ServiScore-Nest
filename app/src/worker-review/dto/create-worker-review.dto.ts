// src/worker-review/dto/create-worker-review.dto.ts
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateWorkerReviewDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsInt()
  @IsNotEmpty()
  workerId: number;

  @IsInt()
  @IsNotEmpty()
  customerId: number;
}