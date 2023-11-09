import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class Ws2AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = this.getRequest(context).headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Não autorizado');
    }

    try {
      const usuario = await this.jwtService.verifyAsync(token, {
        ignoreExpiration: false,
      });

      this.getRequest(context).headers.user = usuario;
      return true;
    } catch (e) {
      return false;
    }
  }

  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient().handshake;
  }
}
