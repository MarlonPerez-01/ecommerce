import { Module } from '@nestjs/common';
import { CargosService } from './cargos.service';
import { CargosController } from './cargos.controller';

@Module({
  controllers: [CargosController],
  providers: [CargosService]
})
export class CargosModule {}
