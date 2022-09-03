import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'correo',
      passwordField: 'contrasenia',
    });
  }

  async validate(correo: string, contrasenia: string) {
    return this.authService.getUsuarioAutenticado(correo, contrasenia);
  }
}
