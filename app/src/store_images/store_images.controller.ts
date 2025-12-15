import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { StoreImagesService } from './store_images.service';
import { CreateStoreImageDto } from './dto/create-store_image.dto';
import { UpdateStoreImageDto } from './dto/update-store_image.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

// Controller for managing store images
@ApiTags('store-images')
@Controller('store-images')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StoreImagesController {
  constructor(private readonly storeImagesService: StoreImagesService) { }
  // Create a new store image
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  create(@Body() createStoreImageDto: CreateStoreImageDto) {
    return this.storeImagesService.create(createStoreImageDto);
  }
  // Retrieve all store images
  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.storeImagesService.findAll();
  }
  // Retrieve a specific store image by ID
  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.storeImagesService.findOne(+id);
  }
  // Update an existing store image by ID
  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateStoreImageDto: UpdateStoreImageDto) {
    return this.storeImagesService.update(+id, updateStoreImageDto);
  }
  // Delete a store image by ID
  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.storeImagesService.remove(+id);
  }
}
