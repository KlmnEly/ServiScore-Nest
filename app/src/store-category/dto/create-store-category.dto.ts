import { IsString, IsNotEmpty, IsOptional, IsBoolean, MaxLength, MinLength } from 'class-validator';

export class CreateStoreCategoryDto {
  @IsNotEmpty({ message: 'The category name is required' })
  @IsString({ message: 'The category name must be a string' })
  @MinLength(3, { message: 'The category name must be at least 3 characters long' })
  @MaxLength(100, { message: 'The category name must not exceed 100 characters' })
  name: string;

  @IsOptional()
  @IsString({ message: 'The description must be a string' })
  description?: string;

  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean value' })
  isActive?: boolean = true;
}
