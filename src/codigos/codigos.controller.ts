import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CodigosService } from './codigos.service';
import { CreateCodigoDto } from './dto/create-codigo.dto';
import { UpdateCodigoDto } from './dto/update-codigo.dto';

@Controller('codigos')
export class CodigosController {
  constructor(private readonly codigosService: CodigosService) {}

  @Post()
  create(@Body() createCodigoDto: CreateCodigoDto) {
    return this.codigosService.create(createCodigoDto);
  }

  @Get()
  findAll() {
    return this.codigosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codigosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCodigoDto: UpdateCodigoDto) {
    return this.codigosService.update(+id, updateCodigoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codigosService.remove(+id);
  }
}
