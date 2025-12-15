import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, } from '@nestjs/common';
import { AdressesService } from './adresses.service';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

// Controller for managing addresses
@ApiTags('Adresses')
@Controller('adresses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdressesController {
  constructor(private readonly adressesService: AdressesService) {}
  // Create a new address
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  create(@Body() createAdressDto: CreateAdressDto) {
    return this.adressesService.create(createAdressDto);
  }
  // Retrieve all addresses
  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.adressesService.findAll();
  }
  // Retrieve a specific address by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adressesService.findOne(+id);
  }
  // Update an existing address by ID
  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateAdressDto: UpdateAdressDto) {
    return this.adressesService.update(+id, updateAdressDto);
  }
  // Delete an address by ID
  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.adressesService.remove(+id);
  }
}
