import { ConsoleLogger, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constant';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class TasksService {
    
    constructor(
        @InjectRepository(Task) private taskRepo: Repository<Task>,
        @InjectRepository(User) private userRepo: Repository<User>
    ) {}

    async create(dto: CreateTaskDto, id: number) {       
        const task =  this.taskRepo.create(dto);
        const user = await this.userRepo.findOneBy({id})        
        task.user = user;
        return await this.taskRepo.save(task);        
    }

    async findOne(id: number, currentUser: any) {
        const task = await this.taskRepo.findOne({ where: { id }, relations: ['user'] });        
        if (!task) {
            throw new NotFoundException();
        }        
        console.log(task.user);
        console.log(currentUser);
        if (task.user.id !== currentUser.id && currentUser.role !== Role.ADMIN) {
            throw new UnauthorizedException();
        }
        const { user, ...result } = task;
        return result;
    }

    async findAll(page: number) {
        const currentPage = page || 1;
        const perPage = DEFAULT_PAGE_SIZE;
        return await this.taskRepo.find({
            skip: (currentPage - 1) * perPage,
            take: perPage
        });
    }

    async update(id: number, dto: UpdateTaskDto, currentUser: any) {  
        const task = await this.taskRepo.findOne({ where: { id }, relations: ['user'] });        
        if (!task) {
            throw new NotFoundException();
        }

        if (task.user.id !== currentUser.id && currentUser.role !== Role.ADMIN) {
            throw new UnauthorizedException();
        }      
        return await this.taskRepo.update({ id }, dto);
    }

    async remove(id: number, currentUser: any) {
        const task = await this.taskRepo.findOne({ where: { id }, relations: ['user'] });        
        if (!task) {
            throw new NotFoundException();
        }

        if (task.user.id !== currentUser.id && currentUser.role !== Role.ADMIN) {
            throw new UnauthorizedException();
        }
        return await this.taskRepo.delete({ id });
    }
}
