import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Service for managing cities
@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) {}
  // Create a new city
  create(createCityDto: CreateCityDto) {
    const city = this.cityRepository.create(createCityDto);
    return this.cityRepository.save(city);
  }
  // Retrieve all cities
  findAll() {
    return this.cityRepository.find();
  }
  // Retrieve a specific city by ID
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const city = await this.cityRepository.findOneBy({ id_city: id });

    if (!city) {
      throw new NotFoundException('City not found');
    }

    return city;
  }
  // Update an existing city by ID
  update(@Param('id', ParseIntPipe) id: number, updateCityDto: UpdateCityDto) {
    return this.cityRepository.update(id, updateCityDto);
  }
  // Delete a city by ID
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cityRepository.delete(id);
  }
}
