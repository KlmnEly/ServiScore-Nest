import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  // Create a new role
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      // 1. Verificar si el email ya existe
      const existingRole = await this.roleRepository.findOne({
        where: { name: createRoleDto.name },
      });

      if (existingRole) {
        throw new ConflictException(`Role with Name "${createRoleDto.name}" already exists.`);
      }

      // 2. Crear y guardar el nuevo Rol
      const newRole = this.roleRepository.create(createRoleDto);
      return await this.roleRepository.save(newRole);

    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      // Captura errores inesperados de DB o servidor
      throw new InternalServerErrorException('Error creating role.');
    }
  }

  // Get all actives roles
  async getAllActiveRoles() {
    try {
      const roles = await this.roleRepository.find({
        where: {
          isActive: true
        }
      });

      if (!roles || roles.length === 0) {
        throw new NotFoundException('No roles found');
      }

      return roles;
    } catch (err: any) {
      if (err.response?.statusCode) throw err;
      throw new InternalServerErrorException('Error fetching roles');
    }
  }

  // Get all roles including soft-deleted ones
  async getAll() {
    try {
      const roles = await this.roleRepository.find();

      if (!roles || roles.length === 0) {
        throw new NotFoundException('No roles found.');
      }

      return roles;
    } catch (err: any) {
      if (err.response?.statusCode) throw err;
      throw new InternalServerErrorException('Error fetching roles.');
    }
  }

  // Get role by ID
  async getById(@Param('id', ParseIntPipe) id: number) {
    if (!id || id <= 0) {
      throw new BadRequestException('A valid id is required.');
    }

    try {
      const roles = await this.roleRepository.findOne({
        where: {
          id_role: id,
          isActive: true
        },
      });

      if (!roles) {
        throw new NotFoundException(`Role with id ${id} not found.`);
      }

      return roles;
    } catch (err: any) {
      if (err.response?.statusCode) throw err;
      throw new InternalServerErrorException('Error fetching role by id.');
    }
  }

  // Get role by name
  async getByName(name: string) {
    if (!name || typeof name !== 'string' || !name.trim()) {
      throw new BadRequestException('A valid name is required.');
    }

    try {
      const role = await this.roleRepository.findOne({
        where: {
          name: name,
          isActive: true
        }
      });

      if (!role) {
        throw new NotFoundException(`Role with name "${name}" not found.`);
      }

      return role;
    } catch (err: any) {
      if (err.response?.statusCode) throw err;
      throw new InternalServerErrorException('Error fetching role by name.');
    }
  }

  // Update a role
  async update(@Param('id', ParseIntPipe) id: number, updateRoleDto: UpdateRoleDto) {
    if (!updateRoleDto.name || !updateRoleDto.name.trim()) {
      return 'No data to update';
    }

    const result = await this.roleRepository.update(id, {
      name: updateRoleDto.name
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Role with id ${id} not found.`);
    }

    return this.roleRepository.findOneBy({ id_role: id });
  }

  // Soft delete (deactivate) or reactivate a role
  async remove(@Param('id', ParseIntPipe) id: number) {
    const role = await this.roleRepository.findOneBy({ id_role: id });

    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found.`);
    }

    // Toggle isActive state
    const newIsActiveState = !role.isActive;

    await this.roleRepository.update(id, { isActive: newIsActiveState });

    return { message: `Role with id ${id} has been ${newIsActiveState ? 'activated' : 'deactivated'}.` };
  }
}
