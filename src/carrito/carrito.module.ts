import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DetalleCarritosModule } from '../detalle-carritos/detalle-carritos.module';
import { CarritoController } from './carrito.controller';
import { CarritoService } from './carrito.service';
import { Carrito } from './entities/carrito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrito]), DetalleCarritosModule],
  controllers: [CarritoController],
  providers: [CarritoService],
  exports: [CarritoService],
})
export class CarritoModule {}
