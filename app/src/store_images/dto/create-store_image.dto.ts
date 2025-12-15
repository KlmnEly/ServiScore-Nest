import { IsInt, IsNotEmpty, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"

// Data Transfer Object for creating a store image
export class CreateStoreImageDto {
    // ID of the store associated with the store_image
    @ApiProperty({
        example: 1,
        description: 'ID of the store associated with the store_image',
    })
    @IsNotEmpty({ message: 'store_id is required' })
    @IsInt({ message: 'store_id must be an integer' })
    @IsPositive({ message: 'store_id must be a positive number' })
    store_id: number;

    @IsNotEmpty({ message: 'image_id is required' })
    @IsInt({ message: 'image_id must be an integer' })
    @IsPositive({ message: 'image_id must be a positive number' })
    image_id: number;
};
