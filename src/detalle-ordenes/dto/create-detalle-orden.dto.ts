import { IsNumber, IsPositive } from 'class-validator';

export class CreateDetalleOrdenDto {
  @IsNumber()
  @IsPositive()
  productoId: number;

  @IsNumber()
  @IsPositive()
  cantidad: number;
}
