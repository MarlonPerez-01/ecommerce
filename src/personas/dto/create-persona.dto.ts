import { IsDate, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePersonaDto {
  @IsString()
  primerNombre: string;

  @IsString()
  segundoNombre: string;

  @IsString()
  primerApellido: string;

  @IsString()
  segundoApellido: string;

  @IsNumber()
  @IsPositive()
  telefono: number;
}
