import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DepartamentosController } from './departamentos.controller';
import { DepartamentosService } from './departamentos.service';
import { Departamento } from './entities/departamento.entity';

@Module({
  controllers: [DepartamentosController],
  providers: [DepartamentosService],
  imports: [TypeOrmModule.forFeature([Departamento])],
})
export class DepartamentosModule {}
