// src/stores/stores.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody, 
  ApiParam, 
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('stores')
@Controller('stores')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT')
@ApiUnauthorizedResponse({ description: 'Unauthorized - Invalid or missing JWT token' })
export class StoresController {
    constructor(private readonly storesService: StoresService) { }

    /**
     * Create a new store
     * @param createStoreDto - Data required to create a new store
     * @returns The newly created store
     */
    @Post()
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ 
        summary: 'Create a new store', 
        description: 'Creates a new store with the provided details. Only accessible by admin users.' 
    })
    @ApiBody({ 
        type: CreateStoreDto,
        description: 'Store creation data',
        examples: {
            basic: {
                summary: 'Basic store creation',
                value: {
                    storeCategoryId: 1,
                    store_name: "Coffee Central",
                    store_description: "A cozy cafe specialized in cold brew.",
                    store_phone: "9876543210",
                    store_total_favourites: 0,
                    isActive: true
                }
            }
        }
    })
    @ApiCreatedResponse({ 
        description: 'The store has been successfully created.',
        schema: {
            example: {
                storeCategoryId: 1,
                store_name: "Coffee Central",
                store_description: "A cozy cafe specialized in cold brew.",
                store_phone: "9876543210",
                store_total_favourites: 0,
                isActive: true,
                id: 1,
                createdAt: "2023-01-01T00:00:00.000Z",
                updatedAt: "2023-01-01T00:00:00.000Z"
            }
        }
    })
    @ApiBadRequestResponse({ 
        description: 'Bad Request - Validation failed',
        schema: {
            example: {
                statusCode: 400,
                message: [
                    'storeCategoryId must not be less than 1',
                    'store_name should not be empty',
                    'store_phone should not be empty'
                ],
                error: 'Bad Request'
            }
        }
    })
    @ApiForbiddenResponse({ 
        description: 'Forbidden - User does not have permission (requires admin role)',
        schema: {
            example: {
                statusCode: 403,
                message: 'Forbidden resource',
                error: 'Forbidden'
            }
        }
    })
    async create(@Body() createStoreDto: CreateStoreDto) {
        return this.storesService.create(createStoreDto);
    }

    /**
     * Get all stores
     * @returns Array of all stores
     */
    @Get()
    @Roles(Role.Admin)
    @ApiOperation({ 
        summary: 'Get all stores', 
        description: 'Retrieves a list of all stores. Only accessible by admin users.' 
    })
    @ApiOkResponse({ 
        description: 'Returns all stores',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number', example: 1 },
                    storeCategoryId: { type: 'number', example: 1 },
                    store_name: { type: 'string', example: 'Coffee Central' },
                    store_description: { type: 'string', example: 'A cozy cafe' },
                    store_phone: { type: 'string', example: '9876543210' },
                    store_total_favourites: { type: 'number', example: 10 },
                    isActive: { type: 'boolean', example: true },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' }
                }
            }
        }
    })
    @ApiForbiddenResponse({ 
        description: 'Forbidden - User does not have permission (requires admin role)',
        schema: {
            example: {
                statusCode: 403,
                message: 'Forbidden resource',
                error: 'Forbidden'
            }
        }
    })
    async findAll() {
        return this.storesService.findAll();
    }

    /**
     * Get a store by ID
     * @param id - The ID of the store to retrieve
     * @returns The requested store
     */
    @Get(':id')
    @Roles(Role.Admin, Role.User)
    @ApiOperation({ 
        summary: 'Get store by ID', 
        description: 'Retrieves a single store by its ID. Accessible by all authenticated users.' 
    })
    @ApiParam({ 
        name: 'id', 
        description: 'ID of the store to retrieve',
        example: 1,
        type: Number
    })
    @ApiOkResponse({ 
        description: 'Returns the requested store',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1 },
                storeCategoryId: { type: 'number', example: 1 },
                store_name: { type: 'string', example: 'Coffee Central' },
                store_description: { type: 'string', example: 'A cozy cafe' },
                store_phone: { type: 'string', example: '9876543210' },
                store_total_favourites: { type: 'number', example: 10 },
                isActive: { type: 'boolean', example: true },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
            }
        }
    })
    @ApiNotFoundResponse({ 
        description: 'Store not found',
        schema: {
            example: {
                statusCode: 404,
                message: 'Store with ID 999 not found',
                error: 'Not Found'
            }
        }
    })
    @ApiForbiddenResponse({ 
        description: 'Forbidden - User does not have permission',
        schema: {
            example: {
                statusCode: 403,
                message: 'Forbidden resource',
                error: 'Forbidden'
            }
        }
    })
    async findOne(@Param('id') id: string) {
        return this.storesService.findOne(+id);
    }

    /**
     * Update a store
     * @param id - The ID of the store to update
     * @param updateStoreDto - The data to update
     * @returns The updated store
     */
    @Patch(':id')
    @Roles(Role.Admin, Role.User)
    @ApiOperation({ 
        summary: 'Update a store', 
        description: 'Updates an existing store. Accessible by admin or the store owner.' 
    })
    @ApiParam({ 
        name: 'id', 
        description: 'ID of the store to update',
        example: 1,
        type: Number
    })
    @ApiBody({ 
        type: UpdateStoreDto,
        description: 'Store update data',
        examples: {
            basic: {
                summary: 'Basic store update',
                value: {
                    store_name: "Updated Coffee Central",
                    store_description: "Now with even better coffee!",
                    store_phone: "9876543211"
                }
            }
        }
    })
    @ApiOkResponse({ 
        description: 'The store has been successfully updated',
        schema: {
            example: {
                id: 1,
                storeCategoryId: 1,
                store_name: "Updated Coffee Central",
                store_description: "Now with even better coffee!",
                store_phone: "9876543211",
                store_total_favourites: 10,
                isActive: true,
                createdAt: "2023-01-01T00:00:00.000Z",
                updatedAt: "2023-01-02T00:00:00.000Z"
            }
        }
    })
    @ApiNotFoundResponse({ 
        description: 'Store not found',
        schema: {
            example: {
                statusCode: 404,
                message: 'Store with ID 999 not found',
                error: 'Not Found'
            }
        }
    })
    @ApiBadRequestResponse({ 
        description: 'Bad Request - Validation failed',
        schema: {
            example: {
                statusCode: 400,
                message: [
                    'store_name should not be empty',
                    'store_phone should not be empty'
                ],
                error: 'Bad Request'
            }
        }
    })
    @ApiForbiddenResponse({ 
        description: 'Forbidden - User does not have permission to update this store',
        schema: {
            example: {
                statusCode: 403,
                message: 'Forbidden resource',
                error: 'Forbidden'
            }
        }
    })
    async update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
        return this.storesService.update(+id, updateStoreDto);
    }

    /**
     * Delete a store
     * @param id - The ID of the store to delete
     * @returns No content
     */
    @Delete(':id')
    @Roles(Role.Admin, Role.User)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ 
        summary: 'Delete a store', 
        description: 'Deletes a store by ID. Accessible by admin or the store owner.' 
    })
    @ApiParam({ 
        name: 'id', 
        description: 'ID of the store to delete',
        example: 1,
        type: Number
    })
    @ApiNoContentResponse({ 
        description: 'The store has been successfully deleted' 
    })
    @ApiNotFoundResponse({ 
        description: 'Store not found',
        schema: {
            example: {
                statusCode: 404,
                message: 'Store with ID 999 not found',
                error: 'Not Found'
            }
        }
    })
    @ApiForbiddenResponse({ 
        description: 'Forbidden - User does not have permission to delete this store',
        schema: {
            example: {
                statusCode: 403,
                message: 'Forbidden resource',
                error: 'Forbidden'
            }
        }
    })
    async remove(@Param('id') id: string) {
        return this.storesService.remove(+id);
    }
}