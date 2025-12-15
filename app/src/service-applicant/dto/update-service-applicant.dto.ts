// src/service-applicant/dto/update-service-applicant.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceApplicantDto } from './create-service-applicant.dto';

export class UpdateServiceApplicantDto extends PartialType(CreateServiceApplicantDto) {}