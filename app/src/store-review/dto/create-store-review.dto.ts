import { IsBoolean, IsInt, IsNotEmpty, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// Data Transfer Object for creating a store review
export class CreateStoreReviewDto {
    @ApiProperty({
        example: 1,
        description: 'ID of the user creating the store review',
    })
    @IsNotEmpty({ message: 'user_id is required' })
    @IsInt({ message: 'user_id must be an integer' })
    @IsPositive({ message: 'user_id must be a positive number' })
    userId: number;

    @IsNotEmpty({ message: 'store_id is required' })
    @IsInt({ message: 'store_id must be an integer' })
    @IsPositive({ message: 'store_id must be a positive number' })
    storeId: number;

    @IsNotEmpty({ message: 'store_review_like is required' })
    @IsBoolean()
    store_review_like: boolean;
};
