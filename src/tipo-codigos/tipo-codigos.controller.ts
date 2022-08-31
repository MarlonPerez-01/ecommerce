import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoCodigosService } from './tipo-codigos.service';
import { CreateTipoCodigoDto } from './dto/create-tipo-codigo.dto';
import { UpdateTipoCodigoDto } from './dto/update-tipo-codigo.dto';

@Controller('tipo-codigos')
export class TipoCodigosController {
  constructor(private readonly tipoCodigosService: TipoCodigosService) {}

  @Post()
  create(@Body() createTipoCodigoDto: CreateTipoCodigoDto) {
    return this.tipoCodigosService.create(createTipoCodigoDto);
  }

  @Get()
  findAll() {
    return this.tipoCodigosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoCodigosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoCodigoDto: UpdateTipoCodigoDto) {
    return this.tipoCodigosService.update(+id, updateTipoCodigoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoCodigosService.remove(+id);
  }
}
