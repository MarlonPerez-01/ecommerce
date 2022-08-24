import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DireccionesService } from './direcciones.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';
import { UpdateDireccionDto } from './dto/update-direccion.dto';

@Controller('direcciones')
export class DireccionesController {
  constructor(private readonly direccionesService: DireccionesService) {}

  @Post()
  create(@Body() createDireccioneDto: CreateDireccionDto) {
    return this.direccionesService.create(createDireccioneDto);
  }

  @Get()
  findAll() {
    return this.direccionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.direccionesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDireccioneDto: UpdateDireccionDto) {
    return this.direccionesService.update(id, updateDireccioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.direccionesService.remove(id);
  }
}
