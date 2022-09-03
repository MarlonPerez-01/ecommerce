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

import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { FindCategoriasDto } from './dto/find-categorias.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  findAll(@Query() findCategoriasDto: FindCategoriasDto) {
    return this.categoriasService.findAll(findCategoriasDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriasService.remove(id);
  }
}
