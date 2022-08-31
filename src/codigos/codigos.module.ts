import { Module } from '@nestjs/common';
import { CodigosService } from './codigos.service';
import { CodigosController } from './codigos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Codigo } from './entities/codigo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Codigo])],
  controllers: [CodigosController],
  providers: [CodigosService],
})
export class CodigosModule {}
