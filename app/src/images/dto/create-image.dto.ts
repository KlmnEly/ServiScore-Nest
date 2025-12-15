import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsNotEmpty, IsString } from "class-validator";

// Data Transfer Object for creating an image
export class CreateImageDto {
    @ApiProperty({
        example: 'http://example.com/image.jpg',
        description: 'URL of the image',
    })
    @IsNotEmpty({ message: 'The image_url must be provided.' })
    @IsString({ message: 'The image_url must be a string value.' })
    image_url: string;

}
