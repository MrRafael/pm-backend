import { Controller, Request, UseGuards, Post, Put } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/verify')
  async verify(@Request() req) {
    return this.authService.verify(req.user);
  }

  @Put('auth/refresh')
  async refresh(@Request() req) {
    return this.authService.refresh(req.headers);
  }
}
