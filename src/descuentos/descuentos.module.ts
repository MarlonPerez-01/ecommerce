import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DescuentosController } from './descuentos.controller';
import { DescuentosService } from './descuentos.service';
import { Descuento } from './entities/descuento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Descuento])],
  controllers: [DescuentosController],
  providers: [DescuentosService],
})
export class DescuentosModule {}
