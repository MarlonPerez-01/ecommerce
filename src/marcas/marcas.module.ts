import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Marca } from './entities/marca.entity';
import { MarcasController } from './marcas.controller';
import { MarcasService } from './marcas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Marca])],
  controllers: [MarcasController],
  providers: [MarcasService],
  exports: [MarcasService],
})
export class MarcasModule {}
