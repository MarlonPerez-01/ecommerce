import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtRefreshPayload } from '../interfaces/jwt-refresh.interface';
import { Usuario } from '../../usuarios/entities/usuario.entity';

// Validación del refresh token
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtRefreshPayload): Promise<Usuario> {
    console.log(req.body?.refreshToken);
    return this.authService.getUsuarioById(payload.sub);
  }
}
