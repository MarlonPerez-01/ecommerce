import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DepartamentosService } from './departamentos.service';

@ApiTags('departamentos')
@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Get()
  findAll() {
    return this.departamentosService.findAll();
  }

  @Get(':id/municipios')
  findOne(@Param('id') id: number) {
    return this.departamentosService.findOne(id);
  }
}
