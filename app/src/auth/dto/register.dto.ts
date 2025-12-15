import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { CreateAccessDto } from "src/accesses/dto/create-access.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateUserAccessDto {
    @ApiProperty({
        description: 'Data for authentication.',
        type: CreateAccessDto
    })
    @Type(() => CreateAccessDto)
    @ValidateNested()
    @IsNotEmpty({ message: 'Access data must be provided.'})
    accessData: CreateAccessDto;

    @ApiProperty({
        description: 'Data for user.',
        type: CreateUserDto
    })
    @Type(() => CreateUserDto)
    @ValidateNested()
    @IsNotEmpty({ message: 'Access data must be provided.'})
    userData: CreateUserDto;
}