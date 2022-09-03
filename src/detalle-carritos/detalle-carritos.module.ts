import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductosModule } from '../productos/productos.module';
import { DetalleCarritosService } from './detalle-carritos.service';
import { DetalleCarrito } from './entities/detalle-carrito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleCarrito]), ProductosModule],
  providers: [DetalleCarritosService],
  exports: [DetalleCarritosService],
})
export class DetalleCarritosModule {}
