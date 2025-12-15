import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    example: 'Diomedes',
    description: 'The first name of the user',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'Diaz',
    description: 'The last name of the user',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 1,
    description: 'The access ID associated with the user',
    required: false
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  accessId?: number;

  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean value.' })
  isActive?: boolean;
}