import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetalleOrdenesController } from './detalle-ordenes.controller';
import { DetalleOrdenesService } from './detalle-ordenes.service';
import { DetalleOrden } from './entities/detalle-orden.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleOrden])],
  controllers: [DetalleOrdenesController],
  providers: [DetalleOrdenesService],
})
export class DetalleOrdenesModule {}
