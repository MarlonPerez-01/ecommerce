import { Module } from '@nestjs/common';

import { TipoCodigosController } from './tipo-codigos.controller';
import { TipoCodigosService } from './tipo-codigos.service';

@Module({
  controllers: [TipoCodigosController],
  providers: [TipoCodigosService],
})
export class TipoCodigosModule {}
