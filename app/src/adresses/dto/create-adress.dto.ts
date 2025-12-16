import {IsInt, IsNotEmpty, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// Data Transfer Object for creating an address
export class CreateAdressDto {
    @ApiProperty({
        example: 1,
        description: 'ID of the store associated with the address',
    })
    @IsNotEmpty({ message: 'store_id is required' })
    @IsInt({ message: 'store_id must be an integer' })
    @IsPositive({ message: 'store_id must be a positive number' })
    storeId: number;

    @IsNotEmpty({ message: 'city_id is required' })
    @IsInt({ message: 'city_id must be an integer' })
    @IsPositive({ message: 'city_id must be a positive number' })
    cityId: number;

    @IsNotEmpty({ message: 'country_id is required' })
    @IsInt({ message: 'country_id must be an integer' })
    @IsPositive({ message: 'country_id must be a positive number' })    
    countryId: number;
}
