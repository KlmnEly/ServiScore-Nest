import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UserImagesService } from './user_images.service';
import { CreateUserImageDto } from './dto/create-user_image.dto';
import { UpdateUserImageDto } from './dto/update-user_image.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('user-images')
@Controller('user-images')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserImagesController {
  constructor(private readonly userImagesService: UserImagesService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  create(@Body() createUserImageDto: CreateUserImageDto) {
    return this.userImagesService.create(createUserImageDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.userImagesService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.userImagesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateUserImageDto: UpdateUserImageDto) {
    return this.userImagesService.update(+id, updateUserImageDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.userImagesService.remove(+id);
  }
}
