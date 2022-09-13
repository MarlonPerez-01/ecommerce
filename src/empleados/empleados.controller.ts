import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import RoleGuard from '../auth/guards/role.guard';
import { RoleEnum } from '../common/enums/role.enum';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { FindEmpleadosDto } from './dto/find-empleados.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { EmpleadosService } from './empleados.service';

@ApiTags('empleados')
@Controller('empleados')
@UseGuards(RoleGuard([RoleEnum.ADMINISTRADOR]))
@UseGuards(AccessTokenGuard)
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Post()
  async create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadosService.create(createEmpleadoDto);
  }

  @Get()
  async findAll(@Query() findEmpleadosDTO: FindEmpleadosDto) {
    return this.empleadosService.findAll(findEmpleadosDTO);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.empleadosService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ) {
    return this.empleadosService.update(id, updateEmpleadoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.empleadosService.remove(id);
  }
}
