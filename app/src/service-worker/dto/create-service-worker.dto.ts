// src/service-worker/dto/create-service-worker.dto.ts
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateServiceWorkerDto {
  @IsString()
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsInt()
  @IsNotEmpty()
  serviceId: number;

  @IsInt()
  @IsNotEmpty()
  workerId: number;
}