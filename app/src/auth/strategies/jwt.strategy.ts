// src/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessesService } from '../../accesses/accesses.service';
import { Payload } from '../interfaces/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accessesService: AccessesService) {
    // Configuration for the JWT strategy
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Show where to extract the JWT (header Bearer)
      ignoreExpiration: false, // Token expiration should ve validated
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // Validate method called automatically by Passport to validate the token
  async validate(payload: Payload) {
    const { sub: id_access } = payload; // Sub is the access record ID

    // Search for the access record in the database
    const access = await this.accessesService.getById(id_access);

    if (!access) {
      throw new UnauthorizedException('Token not valid or user not found');
    }
    return access;
  }
}
