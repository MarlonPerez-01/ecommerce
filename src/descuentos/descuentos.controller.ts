import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DescuentosService } from './descuentos.service';
import { CreateDescuentoDto } from './dto/create-descuento.dto';
import { UpdateDescuentoDto } from './dto/update-descuento.dto';

@Controller('descuentos')
export class DescuentosController {
  constructor(private readonly descuentosService: DescuentosService) {}

  @Post()
  create(@Body() createDescuentoDto: CreateDescuentoDto) {
    return this.descuentosService.create(createDescuentoDto);
  }

  @Get()
  findAll() {
    return this.descuentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.descuentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDescuentoDto: UpdateDescuentoDto) {
    return this.descuentosService.update(+id, updateDescuentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.descuentosService.remove(+id);
  }
}
