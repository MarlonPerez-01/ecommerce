import { Module } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { DepartamentosController } from './departamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';

@Module({
  controllers: [DepartamentosController],
  providers: [DepartamentosService],
  imports: [TypeOrmModule.forFeature([Departamento])],
})
export class DepartamentosModule {}
