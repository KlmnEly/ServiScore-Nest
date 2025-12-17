import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('Service Category')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('service-category')
export class ServiceCategoryController {
    constructor(private readonly serviceCategoryService: ServiceCategoryService) { }

    @Post()
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Create a new service category' })
    @ApiResponse({ status: 201, description: 'Category created successfully.' })
    create(@Body() createServiceCategoryDto: CreateServiceCategoryDto) {
        return this.serviceCategoryService.create(createServiceCategoryDto);
    }

    @Get()
    @Roles(Role.Admin, Role.User)
    @ApiOperation({ summary: 'Get all service categories' })
    findAll() {
        return this.serviceCategoryService.findAll();
    }

    @Get(':id')
    @Roles(Role.Admin, Role.User)
    @ApiOperation({ summary: 'Get a service category by ID' })
    findOne(@Param('id') id: string) {
        return this.serviceCategoryService.findOne(+id);
    }

    @Patch(':id')
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Update a service category' })
    update(@Param('id') id: string, @Body() updateServiceCategoryDto: UpdateServiceCategoryDto) {
        return this.serviceCategoryService.update(+id, updateServiceCategoryDto);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Toggle category active status' })
    remove(@Param('id') id: string) {
        return this.serviceCategoryService.remove(+id);
    }
}
