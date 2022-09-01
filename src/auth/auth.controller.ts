import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';
import { Response } from 'express';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupAuthDto: RegisterAuthDto) {
    return this.authService.signup(signupAuthDto);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  login(
    @Body() loginAuthDto: LoginAuthDto,
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    const { user } = request;
    user.contrasenia = undefined;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    return response.send(user);
  }

  @Post('refresh')
  refresh() {
    return this.authService.refreshToken();
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
