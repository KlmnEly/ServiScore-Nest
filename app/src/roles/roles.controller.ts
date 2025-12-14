import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // Create a new role
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createRoleDto: CreateRoleDto,
  ) {
    return this.rolesService.create(createRoleDto);
  }

  // Get all active roles
  @Get()
  getAllActiveRoles() {
    return this.rolesService.getAllActiveRoles();
  }

  // Get all roles including soft-deleted ones
  // roles/all
  @Get('all')
  getAllRoles() {
    return this.rolesService.getAll(); 
  }

  // Get role by ID
  // roles/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.getById(+id);
  }

  // Get role by name
  // roles/name/:name
  @Get('name/:name')
  getByName(@Param('name') name: string) {
    return this.rolesService.getByName(name);
  }

  // Update a role
  // roles/:id
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  // Delete a role
  // roles/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(+id);
  }
}
