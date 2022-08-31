import { Module } from '@nestjs/common';
import { TipoCodigosService } from './tipo-codigos.service';
import { TipoCodigosController } from './tipo-codigos.controller';

@Module({
  controllers: [TipoCodigosController],
  providers: [TipoCodigosService]
})
export class TipoCodigosModule {}
