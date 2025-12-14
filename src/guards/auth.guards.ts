import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate { // гуарды для защищенных роутов
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const path = request.route?.path || request.url;

    // Публичные роуты
    const publicPaths = ['/auth/signup', '/auth/login', '/auth/refresh', '/doc', '/'];
    if (publicPaths.some(p => path.includes(p))) {
      return true;
    }

    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) { // нужен токен в хэдерах
      throw new UnauthorizedException('Missing or invalid authorization header');
    }

    const token = authHeader.substring(7);
    const payload = this.authService.validateToken(token); // валидация токенов на сервисе

    if (!payload) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    request.user = payload;
    return true;
  }
}