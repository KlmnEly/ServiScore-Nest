import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreCategory } from './entities/store-category.entity';
import { StoreCategoryService } from './store-category.service';
import { StoreCategoryController } from './store-category.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreCategory]),
  ],
  controllers: [StoreCategoryController],
  providers: [StoreCategoryService],
  exports: [StoreCategoryService],
})
export class StoreCategoryModule {}
