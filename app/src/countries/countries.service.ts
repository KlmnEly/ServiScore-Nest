import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';
import { InjectRepository} from '@nestjs/typeorm';

// Service for managing countries
@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private countryRepository: Repository<Country>,
  ) {}
  // Create a new country
  create(createCountryDto: CreateCountryDto) {
    const country = this.countryRepository.create(createCountryDto);
    return this.countryRepository.save(country);
  }
  // Retrieve all countries
  findAll() {
    return this.countryRepository.find();
  }
  // Retrieve a specific country by ID
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const country = await this.countryRepository.findOneBy({ id_country: id });

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return country;
  }
  // Update an existing country by ID
  async update(@Param('id', ParseIntPipe) id: number, dto: UpdateCountryDto) {
    const country = await this.findOne(id);
    Object.assign(country, dto);
    return this.countryRepository.save(country);
  }
  // Delete a country by ID
  async remove(@Param('id', ParseIntPipe) id: number) {
    const country = await this.findOne(id);
    return this.countryRepository.delete(id);
  }
}
