import { PartialType } from '@nestjs/swagger';
import { CreateDetallePedidoDto } from './create-detalle-pedido.dto';

export class UpdateDetallePedidoDto extends PartialType(CreateDetallePedidoDto) {}
