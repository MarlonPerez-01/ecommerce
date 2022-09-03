import { IsNumber, IsPositive } from 'class-validator';

export class UpdateDetalleCarritoDto {
  @IsNumber()
  @IsPositive()
  cantidad: number;
}
