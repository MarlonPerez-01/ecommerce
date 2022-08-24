import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  primerNombre: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  segundoNombre: string;

  @IsString()
  @MinLength(2)
  primerApellido: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  segundoApellido: string;

  @IsString()
  @MinLength(2)
  empresa: string;

  //TODO: validar que sea un numero de 8 digitos
  @IsOptional()
  @IsNumber()
  telefono: number;

  @IsOptional()
  @IsEmail()
  correo: string;
}
