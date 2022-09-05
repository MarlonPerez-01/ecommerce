import { Module } from '@nestjs/common';

import { InventariosController } from './inventarios.controller';
import { InventariosService } from './inventarios.service';

@Module({
  controllers: [InventariosController],
  providers: [InventariosService],
})
export class InventariosModule {}
