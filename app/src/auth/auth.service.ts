import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AccessesService } from '../accesses/accesses.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAccessDto } from '../accesses/dto/create-access.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { CreateUserAccessDto } from './dto/register.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly accessesService: AccessesService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Register new access
  async register (createUserAccessDto: CreateUserAccessDto) {

    const { accessData, userData } = createUserAccessDto;

    const accessCreation: CreateAccessDto = {
      email: accessData.email,
      password: accessData.password,
      roleId: accessData.roleId,
    }

    let newAccessId: number;

    try {
      const createdAccess = await this.accessesService.create(accessCreation);
      newAccessId = createdAccess.id_access;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error('Error creating access:', error);
      throw new InternalServerErrorException('Error during registration');
    }

    try {
      const userCreation: CreateUserDto = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        accessId: newAccessId
      };

      const newUser = await this.usersService.create(userCreation);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
    }

    // Rollback
    try {
      await this.accessesService.deletePermanent(newAccessId);
      console.log(`Rolled back access with ID ${newAccessId}`);
    } catch (rollbackError) {
      console.error(`Error rolling back access with ID ${newAccessId}: ${rollbackError}`);
    }
    throw new InternalServerErrorException('Error during registration');
  }

  // Login existing access
  async login (loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find access by email
    const access = await this.accessesService.getByEmail(email);

    if (!access) {
      throw new UnauthorizedException('Access with this email does not exist');
    }

    // Compare passwords
    const isPasswordMatching = await bcrypt.compare(password, access.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException(`Invalid credentials`);
    }

    // Generate JWT payload (Define what data to include in the token)
    const payload = {
      email: access.email,
      sub: access.id_access,
      role: access.roleId
    };

    // Sign and return the JWT
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
