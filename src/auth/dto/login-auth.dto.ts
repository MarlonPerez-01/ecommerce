import { IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  correo: string;

  @IsString()
  contrasenia: string;
}
