import { Module } from '@nestjs/common';
import { AdressesService } from './adresses.service';
import { AdressesController } from './adresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adress } from './entities/adress.entity';

// Module definition for Adresses
@Module({
  imports: [TypeOrmModule.forFeature([Adress])],
  controllers: [AdressesController],
  providers: [AdressesService],
})
export class AdressesModule {}
