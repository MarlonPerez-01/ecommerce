import { Module } from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { InventariosController } from './inventarios.controller';

@Module({
  controllers: [InventariosController],
  providers: [InventariosService]
})
export class InventariosModule {}
