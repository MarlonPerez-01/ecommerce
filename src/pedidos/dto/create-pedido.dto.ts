import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';

import { CreateDetallePedidoDto } from '../../detalle-pedidos/dto/create-detalle-pedido.dto';

export class CreatePedidoDto {
  @IsNumber()
  @IsPositive()
  proveedorId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateDetallePedidoDto)
  detallePedidos: CreateDetallePedidoDto[];

  @IsDate()
  fechaEntrega: Date;
}
