import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { DescuentosService } from './descuentos.service';
import { CreateDescuentoDto } from './dto/create-descuento.dto';
import { UpdateDescuentoDto } from './dto/update-descuento.dto';

@Controller('descuentos')
export class DescuentosController {
  constructor(private readonly descuentosService: DescuentosService) {}

  @Post()
  async create(@Body() createDescuentoDto: CreateDescuentoDto) {
    return this.descuentosService.create(createDescuentoDto);
  }

  @Get()
  async findAll() {
    return this.descuentosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.descuentosService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDescuentoDto: UpdateDescuentoDto,
  ) {
    return this.descuentosService.update(id, updateDescuentoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.descuentosService.remove(id);
  }
}
