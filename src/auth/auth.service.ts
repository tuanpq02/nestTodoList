import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {    
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');

    const isPasswordMatch = await compare(pass, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');
    
    const { password, ...result } = user;    
    return result;
    // return { id: user.id };
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      name: user.name,
      userRole: user.role,
      sub: user.id 
    };
    console.log('[auth.service.login] payload: ', payload);
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
