// src/status/status.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('Statuses')
@Controller('statuses')
export class StatusController {
  constructor(private readonly statusService: StatusService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new status' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The status has been successfully created.', type: Status })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async create(@Body() createStatusDto: CreateStatusDto): Promise<Status> {
    return this.statusService.createStus(createStatusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all statuses' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all statuses.', type: [Status] })
  async findAll(): Promise<Status[]> {
    return this.statusService.findAllStatus();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a status by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the status.', type: Status })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Status not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Status> {
    return this.statusService.findStatusById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The status has been successfully updated.', type: Status })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Status not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<Status> {
    return this.statusService.updateStatus(id, updateStatusDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a status' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The status has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Status not found.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.statusService.deleteById(id);
  }

  @Post(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Restore a soft-deleted status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The status has been successfully restored.', type: Status })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Status not found.' })
  async restore(@Param('id', ParseIntPipe) id: number): Promise<Status> {
    return this.statusService.restoreStatus(id);
  }
  @Delete('reset-table-force')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Drop statuses table (Dangerous)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Table dropped successfully.' })
  async resetTable(): Promise<{ message: string }> {
    await this.statusService.dropTable();
    return { message: 'Table statuses dropped successfully. It will be recreated by TypeORM on next restart/sync.' };
  }
}