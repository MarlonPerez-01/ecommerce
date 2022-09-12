import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Codigo } from '../codigos/entities/codigo.entity';
import { EmailsModule } from '../emails/emails.module';
import { Token } from '../tokens/entities/token.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    EmailsModule,
    PassportModule,
    JwtModule.register(null),
    TypeOrmModule.forFeature([Usuario, Token, Codigo]),
  ],
  providers: [
    AuthService,
    UsuariosService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
