import { Module } from '@nestjs/common';
import { AccessesService } from './accesses.service';
import { AccessesController } from './accesses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from './entities/access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Access])],
  controllers: [AccessesController],
  providers: [AccessesService],
  exports: [AccessesService, TypeOrmModule]
})
export class AccessesModule {}
