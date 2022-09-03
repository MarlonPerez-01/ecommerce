import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { AuthService } from '../auth.service';
import { JwtAccessPayload } from '../interfaces/jwt-access.interface';

// Validación del access token
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: JwtAccessPayload): Promise<Usuario> {
    return this.authService.getUsuarioById(payload.sub);
  }
}
