import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

// Controller for managing cities
@ApiTags('cities')
@Controller('cities')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}
  // Create a new city
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }
  // Retrieve all cities
  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.citiesService.findAll();
  }
  // Retrieve a specific city by ID
  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(+id);
  }
  // Update an existing city by ID
  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.citiesService.update(+id, updateCityDto);
  }
  // Delete a city by ID
  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.citiesService.remove(+id);
  }
}
