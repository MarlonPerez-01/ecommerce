import { IsNumber, IsPositive } from 'class-validator';

export class AddProductoDto {
  @IsNumber()
  @IsPositive()
  productoId: number;

  @IsNumber()
  @IsPositive()
  cantidad: number;
}
