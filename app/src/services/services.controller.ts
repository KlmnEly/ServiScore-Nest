// src/services/services.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  /**
   * Handles the creation of a new service.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new service' })
  @ApiResponse({ status: 201, description: 'The service has been successfully created.' })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  /**
   * Retrieves a list of all active services.
   */
  @Get()
  @ApiOperation({ summary: 'Get all active services' })
  @ApiResponse({ status: 200, description: 'Return all active services.' })
  findAll() {
    return this.servicesService.findAll();
  }

  /**
   * Retrieves a single service by its ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a service by ID' })
  @ApiResponse({ status: 200, description: 'Return the service successfully.' })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  /**
   * Updates an existing service record.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing service' })
  @ApiResponse({ status: 200, description: 'The service has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  /**
   * Toggles the active status of a service (Soft Delete / Reactivation).
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete (deactivate) or reactivate a service by ID' })
  @ApiResponse({ status: 200, description: 'Service status has been successfully toggled.' })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  remove(@Param('id') id: string) {
    // Note: HttpCode 200 is used because the operation modifies status, not deletes.
    return this.servicesService.remove(+id);
  }
}