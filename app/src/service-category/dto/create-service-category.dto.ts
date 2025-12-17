import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateServiceCategoryDto {
    @ApiProperty({ example: 'Plumbing', description: 'Name of the service category' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'All plumbing related services', description: 'Description of the category', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
