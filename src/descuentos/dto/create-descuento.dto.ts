import { IsDate, IsNumber } from 'class-validator';

export class CreateDescuentoDto {
  @IsNumber()
  productoId: number;

  @IsNumber()
  cantidad: number;

  @IsDate()
  fechaInicio: Date;

  @IsDate()
  fechaFin: Date;
}
