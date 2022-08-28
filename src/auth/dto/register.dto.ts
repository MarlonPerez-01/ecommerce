import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  correo: string;

  @IsString()
  contrasenia: string;
}
