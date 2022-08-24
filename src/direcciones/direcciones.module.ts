import { Module } from '@nestjs/common';
import { DireccionesService } from './direcciones.service';
import { DireccionesController } from './direcciones.controller';

@Module({
  controllers: [DireccionesController],
  providers: [DireccionesService]
})
export class DireccionesModule {}
