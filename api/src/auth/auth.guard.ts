import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './decorators/public.decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);

    const accessToken = token.replace('access_token=', '');

    if (!accessToken) {
      console.log('ici');

      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_SECRET,
      });

      request['user'] = payload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    const cookies = Object.fromEntries(
      request.headers.cookie.split('; ').map((cookie) => cookie.split('=')),
    );
    if (!cookies.access_token) {
      console.warn('Aucun token JWT trouvé dans Authorization ou cookies');
      return undefined;
    }
    return cookies.access_token;
  }
}
