import { Module } from '@nestjs/common';
import { DescuentosService } from './descuentos.service';
import { DescuentosController } from './descuentos.controller';

@Module({
  controllers: [DescuentosController],
  providers: [DescuentosService]
})
export class DescuentosModule {}
