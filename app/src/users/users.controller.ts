import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  /**
   * Get all active users (Admin only)
   * @returns List of active users
   */
  @Get('active')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all active users (Admin only)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all active users',
    schema: {
      example: [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          isActive: true,
          access: {
            id: 1,
            email: 'john.doe@example.com',
            role: 'user'
          }
        }
      ]
    }
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Invalid or missing JWT token'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - User does not have the required role (Admin)'
  })
  findAllActives() {
    return this.usersService.getAllActiveUsers();
  }

  /**
   * Get all users (Admin only)
   * @returns List of all users including inactive ones
   */
  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all users',
    schema: {
      example: [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          isActive: true,
          access: {
            id: 1,
            email: 'john.doe@example.com',
            role: 'user'
          }
        }
      ]
    }
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Invalid or missing JWT token'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - User does not have the required role (Admin)'
  })
  findAll() {
    return this.usersService.getAll();
  }

  /**
   * Get user by ID
   * @param id User ID
   * @returns User details
   */
  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    type: 'number',
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the requested user',
    schema: {
      example: {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        isActive: true,
        access: {
          id: 1,
          email: 'john.doe@example.com',
          role: 'user'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Invalid or missing JWT token'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - User can only access their own data unless they are an admin'
  })
  findOne(@Param('id') id: string) {
    return this.usersService.getById(+id);
  }

  /**
   * Update user information
   * @param id User ID
   * @param updateUserDto User data to update
   * @returns Updated user information
   */
  @Patch(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Update user information' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    type: 'number',
    example: 1
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    type: UpdateUserDto,
    description: 'User data to update, including optional file upload'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    schema: {
      example: {
        id: 1,
        first_name: 'John',
        last_name: 'Doe Updated',
        isActive: true,
        photoUrl: 'https://res.cloudinary.com/...',
        access: {
          id: 1,
          email: 'john.doe@example.com',
          role: 'user'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Invalid or missing JWT token'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - User can only update their own data unless they are an admin'
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      const result = await this.cloudinaryService.uploadImage(file);
      // Determine if 'result' is error or success. Cloudinary SDK types are a bit loose,
      // but result.secure_url exists if success.
      if ('secure_url' in result) {
        updateUserDto.photoUrl = result.secure_url;
      }
    }
    return this.usersService.update(+id, updateUserDto);
  }

  /**
   * Delete a user (soft delete)
   * @param id User ID
   * @returns Confirmation message
   */
  @Delete(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Delete a user (soft delete)' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    type: 'number',
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully',
    schema: {
      example: {
        message: 'User with ID 1 has been deleted'
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - Invalid or missing JWT token'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - User can only delete their own account unless they are an admin'
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
