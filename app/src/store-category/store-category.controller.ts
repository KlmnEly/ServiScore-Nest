import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { StoreCategoryService } from './store-category.service';
import { CreateStoreCategoryDto } from './dto/create-store-category.dto';
import { UpdateStoreCategoryDto } from './dto/update-store-category.dto';
import { StoreCategory } from './entities/store-category.entity';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('Store Categories')
@Controller('store-categories')
export class StoreCategoryController {
  constructor(private readonly storeCategoryService: StoreCategoryService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new store category' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The store category has been successfully created.', type: StoreCategory })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async create(@Body() createStoreCategoryDto: CreateStoreCategoryDto): Promise<StoreCategory> {
    return this.storeCategoryService.create(createStoreCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all store categories' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all store categories.', type: [StoreCategory] })
  async findAll(): Promise<StoreCategory[]> {
    return this.storeCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a store category by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the store category.', type: StoreCategory })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Store category not found.' })
  async findOne(@Param('id',ParseIntPipe) id: number): Promise<StoreCategory> {
    return this.storeCategoryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a store category' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The store category has been successfully updated.', type: StoreCategory })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Store category not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStoreCategoryDto: UpdateStoreCategoryDto,
  ): Promise<StoreCategory> {
    return this.storeCategoryService.update(id, updateStoreCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a store category' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The store category has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Store category not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.storeCategoryService.remove(id);
  }

  @Post(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Restore a soft-deleted store category' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The store category has been successfully restored.', type: StoreCategory })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Store category not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  async restore(@Param('id', ParseIntPipe) id: number): Promise<StoreCategory> {
    return this.storeCategoryService.restore(id);
  }
}
