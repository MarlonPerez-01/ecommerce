import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CodigosController } from './codigos.controller';
import { CodigosService } from './codigos.service';
import { Codigo } from './entities/codigo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Codigo])],
  controllers: [CodigosController],
  providers: [CodigosService],
})
export class CodigosModule {}
