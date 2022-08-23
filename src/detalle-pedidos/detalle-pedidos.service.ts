import { Injectable } from '@nestjs/common';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';

@Injectable()
export class DetallePedidosService {
  create(createDetallePedidoDto: CreateDetallePedidoDto) {
    return 'This action adds a new detallePedido';
  }

  findAll() {
    return `This action returns all detallePedidos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detallePedido`;
  }

  update(id: number, updateDetallePedidoDto: UpdateDetallePedidoDto) {
    return `This action updates a #${id} detallePedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} detallePedido`;
  }
}
