import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateClienteDto {
  @IsOptional()
  @IsString()
  primerNombre?: string;

  @IsOptional()
  @IsString()
  segundoNombre?: string;

  @IsOptional()
  @IsString()
  primerApellido?: string;

  @IsOptional()
  @IsString()
  segundoApellido?: string;

  @IsOptional()
  @IsNumber()
  telefono?: number;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsOptional()
  @IsString()
  contrasenia?: string;

  @IsOptional()
  @IsString()
  nuevaContrasenia?: string;
}
