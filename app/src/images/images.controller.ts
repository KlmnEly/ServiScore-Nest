import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { ImageService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

// Controller for managing images
@ApiTags('images')
@Controller('images')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ImageController {
  constructor(private readonly imageService: ImageService) { }
  // Create a new image
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }
  // Retrieve all images
  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.imageService.findAll();
  }
  // Retrieve a specific image by ID
  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }
  // Update an existing image by ID
  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }
  // Delete an image by ID
  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
