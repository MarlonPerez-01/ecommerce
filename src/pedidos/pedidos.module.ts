import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetallePedido } from '../detalle-pedidos/entities/detalle-pedido.entity';
import { Inventario } from '../inventarios/entities/inventario.entity';
import { Pedido } from './entities/pedido.entity';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, DetallePedido, Inventario])],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
