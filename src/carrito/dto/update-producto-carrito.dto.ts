import { IsNumber, IsPositive } from 'class-validator';

export class UpdateProductoCarritoDto {
  @IsNumber()
  @IsPositive()
  cantidad: number;
}
