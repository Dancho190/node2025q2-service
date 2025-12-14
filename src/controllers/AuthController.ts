import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Controller('auth') // главный роут
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup') // нестед роуты
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: { login: string; password: string }) {
    return this.authService.signup(body.login, body.password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { login: string; password: string }) {
    return this.authService.login(body.login, body.password);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refresh(body.refreshToken);
  }
}