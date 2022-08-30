import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  primerNombre: string;

  @IsOptional()
  @IsString()
  segundoNombre: string;

  @IsString()
  primerApellido: string;

  @IsOptional()
  @IsString()
  segundoApellido: string;

  @IsEmail()
  correo: string;

  @IsString()
  contrasenia: string;

  @IsNumber()
  telefono: number;
}
