import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';

@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Post()
  create(@Body() createDepartamentoDto: CreateDepartamentoDto) {
    return this.departamentosService.create(createDepartamentoDto);
  }

  @Get()
  findAll() {
    return this.departamentosService.findAll();
  }

  @Get(':id/municipios')
  findOne(@Param('id') id: number) {
    return this.departamentosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDepartamentoDto: UpdateDepartamentoDto,
  ) {
    return this.departamentosService.update(id, updateDepartamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.departamentosService.remove(id);
  }
}
