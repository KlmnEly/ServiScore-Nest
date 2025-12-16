import { IsNotEmpty, IsString, IsNumber, Min, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  /**
   * Foreign key for the store category.
   * @example 1
   */
  @ApiProperty({ example: 1, description: 'ID of the category the store belongs to.' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  storeCategoryId: number;

  /**
   * The name of the new store.
   * @example "Coffee Central"
   */
  @ApiProperty({ example: 'Coffee Central', description: 'Unique name of the store.' })
  @IsNotEmpty()
  @IsString()
  store_name: string;

  /**
   * A detailed description of the store.
   * @example "A cozy cafe specialized in cold brew."
   */
  @ApiProperty({ example: 'A cozy cafe specialized in cold brew.', description: 'Detailed description of the store.' })
  @IsNotEmpty()
  @IsString()
  store_description: string;

  /**
   * The store's primary phone number.
   * @example "9876543210"
   */
  @ApiProperty({ example: '9876543210', description: 'Contact phone number.' })
  @IsNotEmpty()
  @IsString()
  store_phone: string;

  /**
   * Initial favorite count (usually 0 on creation).
   * This field is typically managed by the system, so it's optional here.
   * @example 0
   */
  @ApiProperty({ example: 0, description: 'Initial favorite count.', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  store_total_favourites?: number;


  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean value.' })
  isActive?: boolean;
}