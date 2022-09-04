import {
  IsDate,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

import { Direccion } from '../../direcciones/entities/direccion.entity';

export class CreateEmpleadoDto {
  @IsNumber()
  @IsPositive()
  cargoId: number;

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

  @IsOptional()
  @IsNumber()
  telefono: number;

  @IsNumber()
  @IsPositive()
  salario: number;

  @IsString()
  @IsIn(['M', 'F'])
  genero: string;

  @IsDate()
  fechaNacimiento: Date;

  @IsOptional()
  direccion: Direccion;
}
