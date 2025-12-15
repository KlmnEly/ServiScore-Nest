// src/service-worker/service-worker.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { ServiceWorkerService } from './service-worker.service';
import { CreateServiceWorkerDto } from './dto/create-service-worker.dto';
import { UpdateServiceWorkerDto } from './dto/update-service-worker.dto';
import { ServiceWorker } from './entities/service-worker.entity';

@ApiTags('Service Workers')
@Controller('service-workers')
export class ServiceWorkerController {
  constructor(private readonly serviceWorkerService: ServiceWorkerService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Assign a worker to a service' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Worker assigned to service successfully', 
    type: ServiceWorker 
  })
  async create(@Body() createServiceWorkerDto: CreateServiceWorkerDto): Promise<ServiceWorker> {
    return this.serviceWorkerService.createServiceWorker(createServiceWorkerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all service-worker assignments' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'List of all service-worker assignments', 
    type: [ServiceWorker] 
  })
  async findAll(): Promise<ServiceWorker[]> {
    return this.serviceWorkerService.findAllServiceWorkers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a service-worker assignment by ID' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Found service-worker assignment', 
    type: ServiceWorker 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Service-worker assignment not found' 
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ServiceWorker> {
    return this.serviceWorkerService.findServiceWorkerById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a service-worker assignment' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Service-worker assignment updated successfully', 
    type: ServiceWorker 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Service-worker assignment not found' 
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceWorkerDto: UpdateServiceWorkerDto,
  ): Promise<ServiceWorker> {
    return this.serviceWorkerService.updateServiceWorker(id, updateServiceWorkerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove a worker from a service (soft delete)' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Service-worker assignment removed successfully' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Service-worker assignment not found' 
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.serviceWorkerService.remove(id);
  }
}