import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { DetalleOrdenesService } from './detalle-ordenes.service';
import { CreateDetalleOrdenDto } from './dto/create-detalle-orden.dto';
import { UpdateDetalleOrdenDto } from './dto/update-detalle-orden.dto';

@Controller('detalle-ordenes')
export class DetalleOrdenesController {
  constructor(private readonly detalleOrdenesService: DetalleOrdenesService) {}

  @Post()
  create(@Body() createDetalleOrdeneDto: CreateDetalleOrdenDto) {
    return this.detalleOrdenesService.create(createDetalleOrdeneDto);
  }

  @Get()
  findAll() {
    return this.detalleOrdenesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleOrdenesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetalleOrdeneDto: UpdateDetalleOrdenDto,
  ) {
    return this.detalleOrdenesService.update(+id, updateDetalleOrdeneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleOrdenesService.remove(+id);
  }
}
