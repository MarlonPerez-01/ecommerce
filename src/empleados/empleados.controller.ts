import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { FindEmpleadosDto } from './dto/find-empleados.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { EmpleadosService } from './empleados.service';

@ApiTags('empleados')
@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadosService.create(createEmpleadoDto);
  }

  @Get()
  findAll(@Query() findEmpleadosDTO: FindEmpleadosDto) {
    return this.empleadosService.findAll(findEmpleadosDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.empleadosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ) {
    return this.empleadosService.update(id, updateEmpleadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.empleadosService.remove(id);
  }
}
