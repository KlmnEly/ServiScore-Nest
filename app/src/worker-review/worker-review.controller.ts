// src/worker-review/worker-review.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { WorkerReviewService } from './worker-review.service';
import { CreateWorkerReviewDto } from './dto/create-worker-review.dto';
import { UpdateWorkerReviewDto } from './dto/update-worker-review.dto';
import { WorkerReview } from './entities/worker-review.entity';

@ApiTags('Worker Reviews')
@Controller('worker-reviews')
export class WorkerReviewController {
  constructor(private readonly workerReviewService: WorkerReviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new worker review' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Review created successfully', 
    type: WorkerReview 
  })
  async create(@Body() createWorkerReviewDto: CreateWorkerReviewDto): Promise<WorkerReview> {
    return this.workerReviewService.createWorkerReview(createWorkerReviewDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all worker reviews' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'List of all worker reviews', 
    type: [WorkerReview] 
  })
  async findAll(): Promise<WorkerReview[]> {
    return this.workerReviewService.findAllWorkerReviews();
  }

  @Get('worker/:workerId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all reviews for a specific worker' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'List of reviews for the worker', 
    type: [WorkerReview] 
  })
  async findByWorkerId(@Param('workerId', ParseIntPipe) workerId: number): Promise<WorkerReview[]> {
    return this.workerReviewService.findByWorkerId(workerId);
  }

  @Get('worker/:workerId/average-rating')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get average rating for a worker' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Average rating of the worker', 
    schema: {
      type: 'object',
      properties: {
        average: { type: 'number', format: 'float' }
      }
    }
  })
  async getAverageRating(@Param('workerId', ParseIntPipe) workerId: number): Promise<{ average: number }> {
    const average = await this.workerReviewService.getAverageRating(workerId);
    return { average };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a worker review by ID' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Found worker review', 
    type: WorkerReview 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Worker review not found' 
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<WorkerReview> {
    return this.workerReviewService.findWorkerReviewById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a worker review' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Worker review updated successfully', 
    type: WorkerReview 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Worker review not found' 
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkerReviewDto: UpdateWorkerReviewDto,
  ): Promise<WorkerReview> {
    return this.workerReviewService.updateWorkerReview(id, updateWorkerReviewDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a worker review (soft delete)' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Worker review deleted successfully' 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Worker review not found' 
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.workerReviewService.deleteWorkerReviewById(id);
  }
}