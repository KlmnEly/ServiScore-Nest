import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateAccessDto {
    @IsNotEmpty({ message: 'The email must be provided.' })
    @IsString({ message: 'The email must be a string value.' })
    @MinLength(8, { message : 'The email must be at least 8 characters long.' })
    email: string;

    @IsNotEmpty({ message: 'The password must be provided.' })
    @IsString({ message: 'The password must be a string value.' })
    @MinLength(6, { message : 'The password must be at least 6 characters long.' })
    password: string;

    @IsNotEmpty({ message: 'The role must be provided.' })
    @IsNumber({}, { message: 'The role must be a numeric value.' })
    roleId: number;

    @IsOptional()
    @IsBoolean({ message: 'isActive must be a boolean value.' })
    isActive?: boolean;
}
