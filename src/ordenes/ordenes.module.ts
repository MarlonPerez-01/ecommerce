import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Producto } from '../productos/entities/producto.entity';
import { Orden } from './entities/orden.entity';
import { OrdenesController } from './ordenes.controller';
import { OrdenesService } from './ordenes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Orden, Producto])],
  controllers: [OrdenesController],
  providers: [OrdenesService],
})
export class OrdenesModule {}
