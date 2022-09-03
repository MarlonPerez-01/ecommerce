import { IsEmail, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  correo: string;

  //TODO: agregar validacion de longitud de contrasenia
  @IsString()
  contrasenia: string;
}
