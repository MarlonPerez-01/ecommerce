import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Direccion } from '../../direcciones/entities/direccion.entity';

export class CreateEmpleadoDto {
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

  @IsNumber()
  salario: number;

  @IsString()
  genero: string;

  @IsString()
  cargo: string;

  @IsDate()
  fechaNacimiento: Date;

  @IsOptional()
  direccion: Direccion;
}
