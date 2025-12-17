// src/services/services.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiQuery
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../common/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@ApiTags('Services')
@ApiBearerAuth()
@Controller('services')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  /**
   * Create a new service
   * @param createServiceDto - Service data to create
   * @returns The created service
   */
  @Post()
  @Roles(Role.Admin, Role.User)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new service',
    description: 'Create a new service with the provided details. Requires authentication and appropriate role.'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The service has been successfully created.',
    schema: {
      example: {
        id: 1,
        title: 'Plumbing Repair',
        description: 'Professional plumbing services for home and office',
        price: 50.00,
        duration: 60,
        isActive: true,
        service_category_id: 2,
        user_id: 10,
        status_id: 1,
        store_id: 5,
        createdAt: '2023-01-01T12:00:00.000Z',
        updatedAt: '2023-01-01T12:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Invalid or missing JWT token'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - User does not have the required role'
  })
  @ApiBody({
    type: CreateServiceDto,
    examples: {
      basic: {
        summary: 'Basic service creation',
        value: {
          service_category_id: 2,
          user_id: 10,
          status_id: 1,
          title: 'Plumbing Repair',
          description: 'Professional plumbing services for home and office',
          price: 50.00,
          duration: 60,
          isActive: true
        }
      },
      withStore: {
        summary: 'Service with store association',
        value: {
          service_category_id: 2,
          user_id: 10,
          status_id: 1,
          store_id: 5,
          title: 'Plumbing Repair',
          description: 'Professional plumbing services for home and office',
          price: 50.00,
          duration: 60,
          isActive: true
        }
      }
    }
  })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  /**
   * Get all active services
   * @returns List of all active services
   */
  @Get()
  @ApiOperation({
    summary: 'Get all active services',
    description: 'Retrieve a list of all active services. Supports pagination and filtering.'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
    example: 1
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    type: Number,
    example: 10
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filter by category ID',
    type: Number,
    example: 2
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all active services.',
    schema: {
      example: {
        data: [
          {
            id: 1,
            title: 'Plumbing Repair',
            description: 'Professional plumbing services',
            price: 50.00,
            duration: 60,
            isActive: true,
            service_category_id: 2,
            user: {
              id: 10,
              first_name: 'John',
              last_name: 'Doe'
            },
            category: {
              id: 2,
              name: 'Plumbing',
              description: 'Plumbing services'
            },
            store: {
              id: 5,
              name: 'Doe Plumbing',
              address: '123 Main St'
            }
          }
        ],
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error'
  })
  async findAll(
    @Param('page') page = 1,
    @Param('limit') limit = 10,
    @Param('category') category?: number
  ) {
    return this.servicesService.findAll();
  }

  /**
   * Get a service by ID
   * @param id Service ID
   * @returns Service details
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get a service by ID',
    description: 'Retrieve detailed information about a specific service by its ID.'
  })
  @ApiParam({
    name: 'id',
    description: 'Service ID',
    type: 'number',
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return the service successfully.',
    schema: {
      example: {
        id: 1,
        title: 'Plumbing Repair',
        description: 'Professional plumbing services for home and office',
        price: 50.00,
        duration: 60,
        isActive: true,
        service_category_id: 2,
        user: {
          id: 10,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com'
        },
        category: {
          id: 2,
          name: 'Plumbing',
          description: 'Plumbing services',
          isActive: true
        },
        store: {
          id: 5,
          name: 'Doe Plumbing',
          address: '123 Main St',
          phone: '+1234567890',
          isActive: true
        },
        status: {
          id: 1,
          name: 'Available',
          description: 'Service is currently available'
        },
        createdAt: '2023-01-01T12:00:00.000Z',
        updatedAt: '2023-01-01T12:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Service not found'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid service ID format'
  })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  /**
   * Update a service
   * @param id Service ID
   * @param updateServiceDto Service data to update
   * @returns Updated service information
   */
  @Patch(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({
    summary: 'Update an existing service',
    description: 'Update the details of an existing service. Only the service owner or admin can update.'
  })
  @ApiParam({
    name: 'id',
    description: 'Service ID',
    type: 'number',
    example: 1
  })
  @ApiBody({
    type: UpdateServiceDto,
    examples: {
      basic: {
        summary: 'Basic service update',
        value: {
          title: 'Updated Plumbing Service',
          description: 'Updated description for plumbing services',
          price: 55.00,
          duration: 90
        }
      },
      status: {
        summary: 'Update service status',
        value: {
          isActive: false
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The service has been successfully updated.',
    schema: {
      example: {
        id: 1,
        title: 'Updated Plumbing Service',
        description: 'Updated description for plumbing services',
        price: 55.00,
        duration: 90,
        isActive: true,
        service_category_id: 2,
        user_id: 10,
        status_id: 1,
        store_id: 5,
        updatedAt: '2023-01-02T15:30:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Service not found'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Invalid or missing JWT token'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - User can only update their own services unless they are an admin'
  })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  /**
   * Toggle service active status (soft delete/reactivate)
   * @param id Service ID
   * @returns Confirmation message with new status
   */
  @Delete(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({
    summary: 'Toggle service status (soft delete/reactivate)',
    description: 'Toggle the active status of a service. This is a soft delete operation that can be reversed.'
  })
  @ApiParam({
    name: 'id',
    description: 'Service ID',
    type: 'number',
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service status has been successfully toggled.',
    schema: {
      example: {
        message: 'Service with ID 1 has been deactivated',
        isActive: false
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Service not found'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Invalid or missing JWT token'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - User can only modify their own services unless they are an admin'
  })
  async remove(@Param('id') id: string) {
    const result = await this.servicesService.remove(+id);
    // Asumming result is { message: string } and we need to fetch the new state or trust the message.
    // Ideally service should return the new state. 
    // Given the service implementation:
    // return { message: `Service with id ${id} has been ${newIsActiveState ? 'activated' : 'deactivated'}.` };

    return result;
  }
}