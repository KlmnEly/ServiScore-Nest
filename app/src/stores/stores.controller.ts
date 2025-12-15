// src/stores/stores.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('stores')
@Controller('stores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StoresController {
    constructor(private readonly storesService: StoresService) { }

    /**
     * Handles the creation of a new store.
     * @param createStoreDto The data for the new store.
     * @returns The created store entity.
     */
    @Post()
    @Roles(Role.Admin)
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new store' })
    @ApiResponse({ status: 201, description: 'The store has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Validation failed.' })
    create(@Body() createStoreDto: CreateStoreDto) {
        return this.storesService.create(createStoreDto);
    }

    /**
     * Retrieves a list of all stores.
     * @returns An array of store entities.
     */
    @Get()
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Get all stores' })
    @ApiResponse({ status: 200, description: 'Return all stores.' })
    findAll() {
        return this.storesService.findAll();
    }

    /**
     * Retrieves a single store by its ID.
     * @param id The ID of the store.
     * @returns The found store entity.
     */
    @Get(':id')
    @Roles(Role.Admin, Role.User)
    @ApiOperation({ summary: 'Get a store by ID' })
    @ApiResponse({ status: 200, description: 'Return the store successfully.' })
    @ApiResponse({ status: 404, description: 'Store not found.' })
    findOne(@Param('id') id: string) {
        // Note: Param values are strings, convert to number for service logic
        return this.storesService.findOne(+id);
    }

    /**
     * Updates an existing store record.
     * @param id The ID of the store to update.
     * @param updateStoreDto The data to update.
     * @returns The updated store entity.
     */
    @Patch(':id')
    @Roles(Role.Admin, Role.User)
    @ApiOperation({ summary: 'Update an existing store' })
    @ApiResponse({ status: 200, description: 'The store has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Store not found.' })
    update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
        return this.storesService.update(+id, updateStoreDto);
    }

    /**
     * Deletes a store record.
     * @param id The ID of the store to delete.
     * @returns A status code 204 (No Content) on successful deletion.
     */
    @Delete(':id')
    @Roles(Role.Admin, Role.User)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a store by ID' })
    @ApiResponse({ status: 204, description: 'The store has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Store not found.' })
    remove(@Param('id') id: string) {
        return this.storesService.remove(+id);
    }
}