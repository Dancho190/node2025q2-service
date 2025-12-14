import { Injectable, UnauthorizedException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../services/user.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  private refreshTokens = new Map<string, { userId: string; expiresAt: number }>();

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(login: string, password: string) {
    this.validateCredentials(login, password);
    const hashedPassword = await bcrypt.hash(password, 10); // Хэшим пароли в бд
    const user = this.userService.create({ login, password: hashedPassword });
    return { id: user.id, login: user.login };
  }

  async login(login: string, password: string) {
    this.validateCredentials(login, password);
    const user = this.userService.findByLogin(login);
    if (!user || !(await bcrypt.compare(password, user.password))) { // Сравниваем пароли с инпутов
      throw new ForbiddenException('Invalid credentials');
    }
    return this.generateTokens(user.id, user.login);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException('Refresh token is required');

    const tokenData = this.refreshTokens.get(refreshToken);
    if (!tokenData || Date.now() > tokenData.expiresAt) {
      this.refreshTokens.delete(refreshToken); // После рефреша удаляем токен
      throw new ForbiddenException('Invalid or expired refresh token');
    }

    const user = this.userService.getById(tokenData.userId);
    this.refreshTokens.delete(refreshToken);
    return this.generateTokens(user.id, user.login);
  }

  validateToken(token: string) {
    try {
      return this.jwtService.verify(token); // валидация токенов с помощью верифай
    } catch {
      return null;
    }
  }

  private validateCredentials(login: string, password: string) { // валидаторы типов пароля
    if (!login || !password || typeof login !== 'string' || typeof password !== 'string') {
      throw new BadRequestException('Login and password are required and must be strings');
    }
  }

  private generateTokens(userId: string, login: string) {
    const accessToken = this.jwtService.sign( // Создание токенов
      { userId, login },
    );
    const refreshToken = randomUUID();
    this.refreshTokens.set(refreshToken, {
      userId,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000
    });
    return { accessToken, refreshToken };
  }
}