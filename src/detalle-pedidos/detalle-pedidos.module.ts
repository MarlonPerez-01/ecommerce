import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetallePedidosController } from './detalle-pedidos.controller';
import { DetallePedidosService } from './detalle-pedidos.service';
import { DetallePedido } from './entities/detalle-pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePedido])],
  controllers: [DetallePedidosController],
  providers: [DetallePedidosService],
})
export class DetallePedidosModule {}
