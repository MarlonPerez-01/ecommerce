import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProveedorDto {
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

  @IsString()
  empresa: string;

  @IsOptional()
  @IsNumber()
  telefono: number;

  @IsOptional()
  @IsEmail()
  correo: string;
}
