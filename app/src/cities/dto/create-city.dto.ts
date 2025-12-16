import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// Data Transfer Object for creating a city
export class CreateCityDto {
    @ApiProperty({
        example: 'New York',
        description: 'Name of the city',
    })
    @IsNotEmpty({ message: 'city_name is required' })
    @IsString()
    @MinLength(2, { message: 'You need more of 2 characters to create a city'})
    city_name: string;
}
