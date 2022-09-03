import { Strategy } from 'passport-local';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

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
