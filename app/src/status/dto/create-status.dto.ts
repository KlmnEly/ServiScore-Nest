// src/status/dto/create-status.dto.ts
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, IsHexColor } from 'class-validator';

export class CreateStatusDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  @IsHexColor()
  color?: string;
}

// src/status/dto/update-status.dto.ts
import { PartialType } from '@nestjs/mapped-types';

export class UpdateStatusDto extends PartialType(CreateStatusDto) {
  isActive?: boolean;
}