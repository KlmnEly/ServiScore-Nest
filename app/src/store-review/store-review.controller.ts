import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { StoreReviewService } from './store-review.service';
import { CreateStoreReviewDto } from './dto/create-store-review.dto';
import { UpdateStoreReviewDto } from './dto/update-store-review.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('store-review')
@Controller('store-review')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StoreReviewController {
  constructor(private readonly storeReviewService: StoreReviewService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  create(@Body() createStoreReviewDto: CreateStoreReviewDto) {
    return this.storeReviewService.create(createStoreReviewDto);
  }

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.storeReviewService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id') id: string) {
    return this.storeReviewService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateStoreReviewDto: UpdateStoreReviewDto) {
    return this.storeReviewService.update(+id, updateStoreReviewDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.storeReviewService.remove(+id);
  }
}
