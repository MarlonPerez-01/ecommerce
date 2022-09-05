import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly tipoUsuariosService: RolesService) {}

  @Post()
  create(@Body() createTipoUsuarioDto: CreateRolesDto) {
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
  update(
    @Param('id') id: number,
    @Body() updateTipoUsuarioDto: UpdateRolesDto,
  ) {
    return this.tipoUsuariosService.update(id, updateTipoUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tipoUsuariosService.remove(id);
  }
}
