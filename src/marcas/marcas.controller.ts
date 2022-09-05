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

import { CreateMarcaDto } from './dto/create-marca.dto';
import { FindMarcasDto } from './dto/find-marcas.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { MarcasService } from './marcas.service';

@ApiTags('marcas')
@Controller('marcas')
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) {}

  @Post()
  create(@Body() createMarcaDto: CreateMarcaDto) {
    return this.marcasService.create(createMarcaDto);
  }

  @Get()
  findAll(@Query() findMarcasDto: FindMarcasDto) {
    return this.marcasService.findAll(findMarcasDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.marcasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMarcaDto: UpdateMarcaDto) {
    return this.marcasService.update(id, updateMarcaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.marcasService.remove(id);
  }
}
