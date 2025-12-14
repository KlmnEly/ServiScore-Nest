import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AccessesService } from '../accesses/accesses.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAccessDto } from '../accesses/dto/create-access.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private accessesService: AccessesService,
    private jwtService: JwtService,
  ) {}

  // Register new access
  async register (createAccessDto: CreateAccessDto) {
    try {
      return await this.accessesService.create(createAccessDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error during registration');
    }
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
