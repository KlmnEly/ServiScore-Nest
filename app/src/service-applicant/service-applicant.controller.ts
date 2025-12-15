// src/service-applicant/service-applicant.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { ServiceApplicantService } from './service-applicant.service';
import { CreateServiceApplicantDto } from './dto/create-service-applicant.dto';
import { UpdateServiceApplicantDto } from './dto/update-service-applicant.dto';
import { ServiceApplicant } from './entities/service-applicant.entity';

@ApiTags('Service Applicants')
@Controller('service-applicants')
export class ServiceApplicantController {
  constructor(private readonly serviceApplicantService: ServiceApplicantService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Worker)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Apply for a service' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Application submitted successfully', 
    type: ServiceApplicant 
  })
  async create(@Body() createServiceApplicantDto: CreateServiceApplicantDto): Promise<ServiceApplicant> {
    return this.serviceApplicantService.create(createServiceApplicantDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all service applications' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'List of all service applications', 
    type: [ServiceApplicant] 
  })
  async findAll(): Promise<ServiceApplicant[]> {
    return this.serviceApplicantService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a service application by ID' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Found service application', 
    type: ServiceApplicant 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Service application not found' 
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ServiceApplicant> {
    return this.serviceApplicantService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Worker)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a service application' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Service application updated successfully', 
    type: ServiceApplicant 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Service application not found' 
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceApplicantDto: UpdateServiceApplicantDto,
  ): Promise<ServiceApplicant> {
    return this.serviceApplicantService.update(id, updateServiceApplicantDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a service application (soft delete)' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Service application deleted successfully' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Service application not found' 
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.serviceApplicantService.remove(id);
  }
}