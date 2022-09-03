import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Usuario } from '../usuarios/entities/usuario.entity';
import { AuthService } from './auth.service';
import { GetUsuarioActual } from './decorators/get-usuario-actual.decorator';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
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

  @UseGuards(AccessTokenGuard)
  @Get('me')
  async getUsuario(@GetUsuarioActual() usuario: Usuario) {
    return this.authService.getUsuarioById(usuario.id);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  async refresh(
    @Body() refreshAuthDto: RefreshAuthDto,
    @GetUsuarioActual() usuario: Usuario,
  ) {
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

  @Post('confirm-account')
  async confirmAccount(@Body() confirmAccountDto: { codigo: string }) {
    return 'account confirmed';
  }

  @Post('resend-confirmation-email')
  async resendConfirmationEmail() {
    return 'resend confirmation email';
  }

  @Post('reset-password')
  async resetPassword() {
    return 'reset password';
  }

  @Post('forgot-password')
  async forgotPassword() {
    return 'reset password';
  }
}
