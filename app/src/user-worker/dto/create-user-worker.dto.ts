// src/user-worker/dto/create-user-worker.dto.ts
import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserWorkerDto {
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}