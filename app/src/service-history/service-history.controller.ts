// src/service-history/service-history.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, ParseIntPipe, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { ServiceHistoryService } from './service-history.service';
import { CreateServiceHistoryDto } from './dto/create-service-history.dto';
import { UpdateServiceHistoryDto } from './dto/update-service-history.dto';
import { ServiceHistory } from './entities/service-history.entity';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Service History')
@Controller('service-history')
export class ServiceHistoryController {
  constructor(private readonly serviceHistoryService: ServiceHistoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin,)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new service history record' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Service history record created successfully', 
    type: ServiceHistory 
  })
  async create(@Body() createServiceHistoryDto: CreateServiceHistoryDto): Promise<ServiceHistory> {
    return this.serviceHistoryService.createServiceHistory(createServiceHistoryDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all service history records' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'List of all service history records', 
    type: [ServiceHistory] 
  })
  async findAll(): Promise<ServiceHistory[]> {
    return this.serviceHistoryService.findAllServiceHistories();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a service history record by ID' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Found service history record', 
    type: ServiceHistory 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Service history record not found' 
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ServiceHistory> {
    return this.serviceHistoryService.findServiceHistoryById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a service history record' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Service history record updated successfully', 
    type: ServiceHistory 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Service history record not found' 
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceHistoryDto: UpdateServiceHistoryDto,
  ): Promise<ServiceHistory> {
    return this.serviceHistoryService.updateServiceHistory(id, updateServiceHistoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a service history record (soft delete)' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Service history record deleted successfully' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Service history record not found' 
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.serviceHistoryService.DeleteServiceHistoryById(id);
  }
}