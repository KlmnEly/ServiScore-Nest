// src/service-applicant/dto/create-service-applicant.dto.ts
import { IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateServiceApplicantDto {
  @IsString()
  @IsOptional()
  message?: string;

  @IsDecimal()
  @IsOptional()
  proposedPrice?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsInt()
  @IsNotEmpty()
  workerId: number;

  @IsInt()
  @IsNotEmpty()
  serviceId: number;
}