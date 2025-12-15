import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// Data Transfer Object for creating a country
export class CreateCountryDto {
    @ApiProperty({
        example: 'United States',
        description: 'Name of the country',
    })
    @IsNotEmpty({ message: 'country_name is required' })
    country_name: string;
}
