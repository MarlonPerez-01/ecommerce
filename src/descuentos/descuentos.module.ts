import { Module } from '@nestjs/common';
import { DescuentosService } from './descuentos.service';
import { DescuentosController } from './descuentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Descuento } from './entities/descuento.entity';

@Module({
  controllers: [DescuentosController],
  providers: [DescuentosService],
  imports: [TypeOrmModule.forFeature([Descuento])],
})
export class DescuentosModule {}
