import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DireccionesService } from './direcciones.service';
import { Direccion } from './entities/direccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Direccion])],
  providers: [DireccionesService],
  exports: [DireccionesService],
})
export class DireccionesModule {}
