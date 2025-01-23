import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CurrentUser } from 'src/decorator/user.decorator';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    // @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
    create(@Body() dto: CreateTaskDto, @CurrentUser() user: User) {
        return this.tasksService.create(dto, user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
        
        return this.tasksService.findOne(id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Query('page') page?: number) {
        return this.tasksService.findAll(page);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTaskDto, 
        @CurrentUser() user: User
    ) {
        return this.tasksService.update(id, dto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    delete(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
        return this.tasksService.remove(id, user);
    }
}
