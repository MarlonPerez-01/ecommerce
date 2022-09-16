import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CodigosService } from './codigos.service';
import { CreateCodigoDto } from './dto/create-codigo.dto';
import { UpdateCodigoDto } from './dto/update-codigo.dto';

@Controller('codigos')
export class CodigosController {
  constructor(private readonly codigosService: CodigosService) {}

  @Post()
  async create(@Body() createCodigoDto: CreateCodigoDto) {
    return this.codigosService.create(createCodigoDto);
  }

  @Get()
  async findAll() {
    return this.codigosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.codigosService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCodigoDto: UpdateCodigoDto,
  ) {
    return this.codigosService.update(id, updateCodigoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.codigosService.remove(id);
  }
}
