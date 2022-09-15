import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
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

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AccessTokenGuard)
  @Get('me')
  async getUsuario(@GetUsuarioActual() usuario: Usuario) {
    return this.authService.getUsuarioById(usuario.id);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  async refresh(@Body() refreshAuthDto: RefreshAuthDto) {
    const accessToken = await this.authService.refreshToken(refreshAuthDto);
    return { accessToken, refreshToken: refreshAuthDto.refreshToken };
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(204)
  @Post('logout')
  async logout(@Body() refreshAuthDto: RefreshAuthDto) {
    return this.authService.logout(refreshAuthDto);
  }

  @Post('verify-account')
  async verifyAccountDto(@Body() verifyAccountDto: VerifyAccountDto) {
    return this.authService.verifyAccount(verifyAccountDto);
  }

  @Post('resend-confirmation-email')
  async resendConfirmationEmail(@Body() correoDto: CorreoDto) {
    return this.authService.resendConfirmationEmail(correoDto.correo);
  }

  @Post('email-change-password')
  async enviarCorreoCambiarContrasenia(@Body() correoDto: CorreoDto) {
    return this.authService.enviarCorreoCambiarContrasenia(correoDto.correo);
  }

  @Post('change-password')
  async cambiarContrasenia(
    @Body() cambiarContraseniaDto: CambiarContraseniaDto,
  ) {
    return this.authService.cambiarContrasenia(cambiarContraseniaDto);
  }
}
