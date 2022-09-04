import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CargosModule } from '../cargos/cargos.module';
import { PersonasModule } from '../personas/personas.module';
import { EmpleadosController } from './empleados.controller';
import { EmpleadosService } from './empleados.service';
import { Empleado } from './entities/empleado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Empleado]), CargosModule, PersonasModule],
  controllers: [EmpleadosController],
  providers: [EmpleadosService],
  exports: [EmpleadosService],
})
export class EmpleadosModule {}
