// src/user-worker/user-worker.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWorker } from './entities/user-worker.entity';
import { UserWorkerService } from './user-worker.service';
import { UserWorkerController } from './user-worker.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserWorker, User]),
  ],
  controllers: [UserWorkerController],
  providers: [UserWorkerService],
  exports: [UserWorkerService],
})
export class UserWorkerModule {}