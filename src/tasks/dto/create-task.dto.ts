import { IsBoolean, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    name: string;

    @IsBoolean()
    completed: boolean;
}