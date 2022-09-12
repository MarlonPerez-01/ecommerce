import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Usuario } from '../../usuarios/entities/usuario.entity';
import { AuthService } from '../auth.service';
import { JwtRefreshPayload } from '../interfaces/jwt-refresh.interface';

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
    return this.authService.getUsuarioById(payload.sub);
  }
}
