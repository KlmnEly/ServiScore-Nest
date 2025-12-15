import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// Data Transfer Object for creating a city
export class CreateCityDto {
    @ApiProperty({
        example: 'New York',
        description: 'Name of the city',
    })
    @IsNotEmpty({ message: 'city_name is required' })
    city_name: string;
}
