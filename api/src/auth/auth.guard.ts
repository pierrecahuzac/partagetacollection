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
    
    // Si l'endpoint est public, on ne vérifie pas l'authentification
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
   
    const token = this.extractTokenFromRequest(request);

    
    if (!token) {
      throw new UnauthorizedException('Token manquant');
    }    
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;  // Attaché l'utilisateur dans la requête
    } catch (error) {
      console.error('Erreur lors de la validation du token JWT:', error);
      throw new UnauthorizedException('Token invalide ou expiré');
    }
    
    return true;
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    const cookies = this.parseCookies(request.headers.cookie);
    

    
    if (!cookies['access_token']) {
      console.warn('Aucun token JWT trouvé dans les cookies');
      return undefined;
    }

    return cookies['access_token'];
  }

  private parseCookies(cookieHeader: string | undefined): Record<string, string> {
    if (!cookieHeader) {
      return {};
    }

    return Object.fromEntries(
      cookieHeader.split('; ').map((cookie) => cookie.split('='))
    );
  }
}
