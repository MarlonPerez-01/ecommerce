import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateDireccionDto {
  @IsNumber()
  @IsPositive()
  departamentoId: number;

  @IsNumber()
  @IsPositive()
  municipioId: number;

  @IsString()
  detalle: string;
}
