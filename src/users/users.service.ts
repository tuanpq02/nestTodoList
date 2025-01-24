import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constant';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private  userRepo: Repository<User>) {}
  
  async create(createUserDto: CreateUserDto) {

    const existingUser = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException ('Email already exists');
    }

    const user =  this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async findAll( page: number) {    
    const currentPage = page || 1;
    const perPage = DEFAULT_PAGE_SIZE;
    return await this.userRepo.find({
        skip: (currentPage - 1) * perPage,
        take: perPage
    });
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({
      where: {
        email,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({id});
    if (!user) {
        throw new NotFoundException();
    }
    return user;    
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepo.update({ id }, updateUserDto);
    return { id, ...updateUserDto };
  }

  async remove(id: number, currentUser: any) {
    const user = await this.userRepo.findOneBy({id});

    // console.log(user);
    // console.log(currentUser);
    
    if (currentUser.role !== Role.ADMIN) {
        throw new UnauthorizedException('role ADMIN is required!');
    }
    if (user.id !== currentUser.id && user.role === Role.ADMIN) {
        throw new UnauthorizedException('ADMIN can not delete other ADMIN');
    }

    await this.userRepo.delete({ id });
    return user;
  }
}
