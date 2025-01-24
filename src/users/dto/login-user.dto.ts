import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {
    @ApiProperty({example: "admin@email.com"})
    @IsEmail()
    email: string;

    @ApiProperty({example: "admin"})
    @IsString()
    password: string;
}
