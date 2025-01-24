import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString } from "class-validator";
import { Role } from "src/auth/enums/role.enum";

export class CreateUserDto {
    @ApiProperty({ description: "user name", example: "admin"})
    @IsString()
    name: string;

    @ApiProperty({example: "admin@email.com"})
    @IsEmail()
    email: string;

    @ApiProperty({example: "admin"})
    @IsString()
    password: string;

    @ApiProperty({example: "ADMIN"})
    @IsEnum(Role)
    role: Role;
}
