import { Module } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { EmpleadosController } from './empleados.controller';

@Module({
  controllers: [EmpleadosController],
  providers: [EmpleadosService]
})
export class EmpleadosModule {}
