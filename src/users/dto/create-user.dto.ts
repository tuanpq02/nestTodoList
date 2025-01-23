import { IsEmail, IsEnum, IsString } from "class-validator";
import { Role } from "src/auth/enums/role.enum";
import { UserRole } from "src/entities/user.entity";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsEnum(Role)
    role: Role;
}
