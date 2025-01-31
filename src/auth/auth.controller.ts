import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorator/public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Controller()
@ApiTags("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @ApiOperation({ summary: 'Log in by email and password ' })
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req: any, @Body() body: LoginUserDto) {    
    return this.authService.login(req.user);    
  }

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,    
  })
  @Public()
  @Post('auth/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req) {    
    return req.user;
  }
  
  @UseGuards(LocalAuthGuard)  
  @ApiBearerAuth()
  @Post('auth/logout')
  async logout(@Request() req) {
    return req.logout();
  }

}
