import { IsNumber, IsPositive } from 'class-validator';

export class CreateDetallePedidoDto {
  @IsNumber()
  @IsPositive()
  productoId: number;

  @IsNumber()
  @IsPositive()
  cantidad: number;

  @IsNumber()
  @IsPositive()
  precio: number;
}
