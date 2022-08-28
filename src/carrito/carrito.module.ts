import { Module } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';

@Module({
  controllers: [CarritoController],
  providers: [CarritoService]
})
export class CarritoModule {}
