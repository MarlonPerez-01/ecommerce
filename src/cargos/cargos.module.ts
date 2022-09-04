import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CargosController } from './cargos.controller';
import { CargosService } from './cargos.service';
import { Cargo } from './entities/cargo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cargo])],
  controllers: [CargosController],
  providers: [CargosService],
  exports: [CargosService],
})
export class CargosModule {}
