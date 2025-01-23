import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Public } from './auth/decorator/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.configService.get('dbconfig.dev.type');
  }
}
