import { IsEmail, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsNumber()
  @IsPositive()
  idPersona: number;

  @IsEmail()
  correo: string;

  @IsString()
  contrasenia: string;
}
