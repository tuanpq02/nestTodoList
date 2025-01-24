import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateTaskDto {
    @ApiProperty({ description: "Name of the task", example: "wake up" })
    @IsString()
    name: string;

    @ApiProperty({ description: "Checking if the task is done", example: true})
    @IsBoolean()
    completed: boolean;
}