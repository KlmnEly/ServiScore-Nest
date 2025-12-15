// src/service-history/service-history.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceHistory } from './entities/service-history.entity';
import { ServiceHistoryService } from './service-history.service';
import { ServiceHistoryController } from './service-history.controller';
import { User } from '../users/entities/user.entity';
import { Status } from '../status/entities/status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceHistory, User, Status]),
  ],
  controllers: [ServiceHistoryController],
  providers: [ServiceHistoryService],
  exports: [ServiceHistoryService],
})
export class ServiceHistoryModule {}