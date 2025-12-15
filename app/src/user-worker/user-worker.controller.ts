// src/user-worker/user-worker.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { UserWorkerService } from './user-worker.service';
import { CreateUserWorkerDto } from './dto/create-user-worker.dto';
import { UpdateUserWorkerDto } from './dto/update-user-worker.dto';
import { UserWorker } from './entities/user-worker.entity';

@ApiTags('User Workers')
@Controller('user-workers')
export class UserWorkerController {
  constructor(private readonly userWorkerService: UserWorkerService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new worker user' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Worker user created successfully', 
    type: UserWorker 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'User not found' 
  })
  async create(@Body() createUserWorkerDto: CreateUserWorkerDto): Promise<UserWorker> {
    return this.userWorkerService.createUserWorker(createUserWorkerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active worker users' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'List of all active worker users', 
    type: [UserWorker] 
  })
  async findAll(): Promise<UserWorker[]> {
    return this.userWorkerService.findAllUserWorkers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get worker user by ID' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Found worker user', 
    type: UserWorker 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Worker user not found' 
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserWorker> {
    return this.userWorkerService.findUserWorkerById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a worker user' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Worker user updated successfully', 
    type: UserWorker 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Worker user not found' 
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserWorkerDto: UpdateUserWorkerDto,
  ): Promise<UserWorker> {
    return this.userWorkerService.updateUserWorker(id, updateUserWorkerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a worker user (soft delete)' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Worker user deleted successfully' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Worker user not found' 
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userWorkerService.removeUserWorkerById(id);
  }
}