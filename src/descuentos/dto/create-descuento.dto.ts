import { IsDate, IsNumber } from 'class-validator';

export class CreateDescuentoDto {
  @IsNumber()
  cantidad: number;

  @IsDate()
  fechaInicio: Date;

  @IsDate()
  fechaFin: Date;
}
