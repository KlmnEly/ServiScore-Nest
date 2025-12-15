import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserAccessDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register Endpoint
  // auth/register
@Post('register')
  @HttpCode(HttpStatus.CREATED)
  register (
    @Body() createUserAccessDto: CreateUserAccessDto,
  ) {
    return this.authService.register(createUserAccessDto);
  }

  // Login Endpoint
  // auth/login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login (@Body() loginDto: LoginDto) {
    // If login is successful, return the JWT token
    return this.authService.login(loginDto);
  }

}
