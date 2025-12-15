import { IsInt, IsNotEmpty, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger"

export class CreateUserImageDto {
    @ApiProperty({
        example: 1,
        description: 'ID of the user associated with the user_image',
    })
    @IsNotEmpty({ message: 'user_id is required' })
    @IsInt({ message: 'user_id must be an integer' })
    @IsPositive({ message: 'user_id must be a positive number' })
    user_id: number;

    @IsNotEmpty({ message: 'image_id is required' })
    @IsInt({ message: 'image_id must be an integer' })
    @IsPositive({ message: 'image_id must be a positive number' })
    image_id: number;
}
