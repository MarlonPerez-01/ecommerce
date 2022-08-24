import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoUsuariosService } from './tipo-usuarios.service';
import { CreateTipoUsuarioDto } from './dto/create-tipo-usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo-usuario.dto';

@Controller('tipo-usuarios')
export class TipoUsuariosController {
  constructor(private readonly tipoUsuariosService: TipoUsuariosService) {}

  @Post()
  create(@Body() createTipoUsuarioDto: CreateTipoUsuarioDto) {
    return this.tipoUsuariosService.create(createTipoUsuarioDto);
  }

  @Get()
  findAll() {
    return this.tipoUsuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tipoUsuariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTipoUsuarioDto: UpdateTipoUsuarioDto) {
    return this.tipoUsuariosService.update(id, updateTipoUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tipoUsuariosService.remove(id);
  }
}
