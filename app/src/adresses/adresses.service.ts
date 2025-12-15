import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Adress } from './entities/adress.entity';

@Injectable()
export class AdressesService {
  constructor(
    @InjectRepository(Adress) private adressRepository: Repository<Adress>,
  ) {}
  // Create a new address
  create(createAdressDto: CreateAdressDto) {
    const adress = this.adressRepository.create(createAdressDto);
    return this.adressRepository.save(adress);
  }
  // Retrieve all addresses
  findAll() {
    return this.adressRepository.find();
  }
  // Retrieve a specific address by ID
  async findOne(id: number) {
    const address = await this.adressRepository.findOneBy({ id_adress: id });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }
  // Update an existing address by ID
  async update(id: number, dto: UpdateAdressDto) {
    const address = await this.findOne(id);
    Object.assign(address, dto);
    return this.adressRepository.save(address);
  }
  // Delete an address by ID
  async remove(id: number) {
    const address = await this.findOne(id);
    return this.adressRepository.delete(id);
  }
}
