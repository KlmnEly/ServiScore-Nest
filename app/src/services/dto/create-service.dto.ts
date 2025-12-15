// src/services/dto/create-service.dto.ts

import { IsNotEmpty, IsString, IsNumber, IsDecimal, IsDateString, IsOptional, Min, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  /**
   * Foreign key for the service category.
   * @example 2
   */
  @ApiProperty({ example: 2, description: 'ID of the category the service belongs to.' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  service_category_id: number;

  /**
   * ID of the user (provider) offering the service.
   * @example 10
   */
  @ApiProperty({ example: 10, description: 'ID of the user providing the service.' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  user_id: number;

  /**
   * ID of the service status (e.g., 1 for active/available).
   * @example 1
   */
  @ApiProperty({ example: 1, description: 'ID of the current status of the service.' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  status_id: number;

  /**
   * ID of the associated store (optional).
   * @example 5
   */
  @ApiProperty({ example: 5, description: 'ID of the physical store (optional).', required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  store_id?: number;

  /**
   * Title of the service.
   * @example "Plumbing Repair"
   */
  @ApiProperty({ example: 'Plumbing Repair', description: 'Title of the service.' })
  @IsNotEmpty()
  @IsString()
  service_title: string;

  /**
   * Description of the service.
   * @example "Emergency and scheduled plumbing services."
   */
  @ApiProperty({ example: 'Emergency and scheduled plumbing services.', description: 'Detailed description.' })
  @IsNotEmpty()
  @IsString()
  service_description: string;

  /**
   * Price of the service. Must be a positive decimal number.
   * @example 75.50
   */
  @ApiProperty({ example: 75.50, description: 'Price of the service.' })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  service_price: number;

  /**
   * Location or service area.
   * @example "City A area only"
   */
  @ApiProperty({ example: 'City A area only', description: 'Physical location or service area.' })
  @IsNotEmpty()
  @IsString()
  service_location: string;

  /**
   * Scheduled date and time for the service (ISO 8601 format).
   * @example "2025-12-31T10:00:00Z"
   */
  @ApiProperty({ example: '2025-12-31T10:00:00Z', description: 'Scheduled date and time (ISO 8601).' })
  @IsNotEmpty()
  @IsDateString()
  service_datetime: Date;
}