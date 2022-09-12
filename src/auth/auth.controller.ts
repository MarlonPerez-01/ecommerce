import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Usuario } from '../usuarios/entities/usuario.entity';
import { AuthService } from './auth.service';
import { GetUsuarioActual } from './decorators/get-usuario-actual.decorator';
import { CambiarContraseniaDto } from './dto/cambiar-contrasenia.dto';
import { CorreoDto } from './dto/correo.dto';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { VerifyAccountDto } from './dto/verify-account.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupAuthDto: RegisterAuthDto) {
    return this.authService.signup(signupAuthDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@GetUsuarioActual() usuario: Usuario) {
    return this.authService.login(usuario);
  }

  // FIXME: eliminar propiedad contrasenia en un interceptor
  @UseGuards(AccessTokenGuard)
  @Get('me')
  async getUsuario(@GetUsuarioActual() usuario: Usuario) {
    const data = await this.authService.getUsuarioById(usuario.id);
    delete data.contrasenia;
    return data;
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  async refresh(@Body() refreshAuthDto: RefreshAuthDto) {
    const accessToken = await this.authService.refreshToken(refreshAuthDto);
    return { accessToken, refreshToken: refreshAuthDto.refreshToken };
  }

  @HttpCode(204)
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@GetUsuarioActual() usuario: Usuario) {
    await this.authService.logout(usuario.id);
    return null;
  }

  @Post('verify-account')
  async verifyAccountDto(@Body() verifyAccountDto: VerifyAccountDto) {
    return this.authService.verifyAccount(verifyAccountDto);
  }

  @Post('resend-confirmation-email')
  async resendConfirmationEmail(@Body() correoDto: CorreoDto) {
    const { correo } = correoDto;
    return this.authService.resendConfirmationEmail(correo);
  }

  @Post('correo-cambiar-contrasenia')
  async enviarCorreoCambiarContrasenia(@Body() correoDto: CorreoDto) {
    const { correo } = correoDto;
    return this.authService.enviarCorreoCambiarContrasenia(correo);
  }

  @Post('cambiar-contrasenia')
  async cambiarContrasenia(
    @Body() cambiarContraseniaDto: CambiarContraseniaDto,
  ) {
    return this.authService.cambiarContrasenia(cambiarContraseniaDto);
  }
}
