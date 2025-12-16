// src/service-worker/service-worker.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceWorker } from './entities/service-worker.entity';
import { ServiceWorkerService } from './service-worker.service';
import { ServiceWorkerController } from './service-worker.controller';
import { Service } from '../services/entities/service.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceWorker, Service, User]),
  ],
  controllers: [ServiceWorkerController],
  providers: [ServiceWorkerService],
  exports: [ServiceWorkerService],
})
export class ServiceWorkerModule {}