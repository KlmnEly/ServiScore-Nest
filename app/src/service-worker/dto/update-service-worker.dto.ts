// src/service-worker/dto/update-service-worker.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceWorkerDto } from './create-service-worker.dto';

export class UpdateServiceWorkerDto extends PartialType(CreateServiceWorkerDto) {}