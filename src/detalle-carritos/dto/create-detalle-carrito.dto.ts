import { IsNumber, IsPositive } from 'class-validator';

export class CreateDetalleCarritoDto {
  @IsNumber()
  @IsPositive()
  productoId: number;

  @IsNumber()
  @IsPositive()
  cantidad: number;
}
