import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'correo',
      passwordField: 'contrasenia',
    });
  }

  async validate(correo: string, contrasenia: string): Promise<Usuario> {
    const usuario = await this.authService.validateUser(correo, contrasenia);
    if (!usuario) throw new UnauthorizedException();
    return usuario;
  }
}
