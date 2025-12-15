// src/service-applicant/service-applicant.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceApplicant } from './entities/service-applicant.entity';
import { ServiceApplicantService } from './service-applicant.service';
import { ServiceApplicantController } from './service-applicant.controller';
import { User } from '../users/entities/user.entity';
import { Service } from '../services/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceApplicant, User, Service]),
  ],
  controllers: [ServiceApplicantController],
  providers: [ServiceApplicantService],
  exports: [ServiceApplicantService],
})
export class ServiceApplicantModule {}