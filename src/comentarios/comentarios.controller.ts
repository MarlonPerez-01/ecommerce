import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetUsuarioActual } from '../auth/decorators/get-usuario-actual.decorator';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import RoleGuard from '../auth/guards/role.guard';
import { RoleEnum } from '../common/enums/role.enum';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';

@ApiTags('comentarios')
@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @UseGuards(RoleGuard(RoleEnum.CLIENTE))
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(
    @Body() createComentarioDto: CreateComentarioDto,
    @GetUsuarioActual() usuario: Usuario,
  ) {
    return this.comentariosService.create(usuario.id, createComentarioDto);
  }

  @Get(':productoId')
  async findAllByProductoId(@Param('productoId') productoId: number) {
    return this.comentariosService.findAllByProductoId(productoId);
  }

  @UseGuards(RoleGuard(RoleEnum.CLIENTE))
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateComentarioDto: UpdateComentarioDto,
    @GetUsuarioActual() usuario: Usuario,
  ) {
    return this.comentariosService.update(id, usuario.id, updateComentarioDto);
  }

  @UseGuards(RoleGuard(RoleEnum.CLIENTE))
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUsuarioActual() usuario: Usuario) {
    return this.comentariosService.remove(id, usuario.id);
  }
}
