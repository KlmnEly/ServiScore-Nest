import { Controller, Get, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AccessesService } from './accesses.service';
import { UpdateAccessDto } from './dto/update-access.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('accesses')
// Apply both JWT authentication and role authorization guards
@UseGuards(JwtAuthGuard, RolesGuard)
export class AccessesController {
  constructor(private readonly accessesService: AccessesService) {}

  // Get all active accesses
  @Get()
  @Roles(Role.Admin)
  getAllActiveAccesses() {
    return this.accessesService.getAllActiveAccesses();
  }

  // Get all accesses including soft-deleted ones
  // accesses/all
  @Get('all')
  @Roles(Role.Admin)
  getAllAccesses() {
    return this.accessesService.getAll();
  }

  // Get acces by id
  // accesses/:id
  // Using ParseIntPipe to transform and validate
  @Get(':id')
  @Roles(Role.Admin)
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.accessesService.getById(+id);
  }

  // Get access by email
  // accesses/email/:email
  @Get('email/:email')
  @Roles(Role.Admin)
  getByEmail(@Param('email') email: string) {
    return this.accessesService.getByEmail(email);
  }

  // Update an access
  // accesses/:id
  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAccessDto: UpdateAccessDto) {
    return this.accessesService.update(+id, updateAccessDto);
  }

  // Delete an access
  // accesses/:id
  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.accessesService.remove(+id);
  }
}
