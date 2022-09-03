import { Module } from '@nestjs/common';

import { DetalleOrdenesController } from './detalle-ordenes.controller';
import { DetalleOrdenesService } from './detalle-ordenes.service';

@Module({
  controllers: [DetalleOrdenesController],
  providers: [DetalleOrdenesService]
})
export class DetalleOrdenesModule {}
