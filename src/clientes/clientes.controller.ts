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
import { GetUsuarioActual } from 'src/auth/decorators/get-usuario-actual.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import RoleGuard from 'src/auth/guards/role.guard';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

import { CreateDireccionDto } from '../direcciones/dto/create-direccion.dto';
import { UpdateDireccionDto } from '../direcciones/dto/update-direccion.dto';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @UseGuards(RoleGuard([RoleEnum.CLIENTE]))
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  async findAll() {
    return this.clientesService.findAll();
  }

  @Get('/direcciones')
  async getDirecciones(@GetUsuarioActual() usuario: Usuario) {
    return this.clientesService.getDirecciones(usuario);
  }

  @UseGuards(RoleGuard([RoleEnum.CLIENTE]))
  @UseGuards(AccessTokenGuard)
  @Get('/direcciones/:id')
  async getDireccion(
    @Param('id') id: number,
    @GetUsuarioActual() usuario: Usuario,
  ) {
    return this.clientesService.getDireccion(usuario, id);
  }

  @UseGuards(RoleGuard([RoleEnum.CLIENTE]))
  @UseGuards(AccessTokenGuard)
  @Patch('/direcciones/:id')
  async updateDireccion(
    @Param('id') direccionId: number,
    @GetUsuarioActual() usuario: Usuario,
    @Body() updateDireccionDto: UpdateDireccionDto,
  ) {
    return this.clientesService.updateDireccion(
      usuario,
      direccionId,
      updateDireccionDto,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.clientesService.findOne(id);
  }

  @UseGuards(RoleGuard([RoleEnum.CLIENTE]))
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateClienteDto: UpdateClienteDto,
    @GetUsuarioActual() usuario: Usuario,
  ) {
    return this.clientesService.update(id, usuario, updateClienteDto);
  }

  @UseGuards(RoleGuard([RoleEnum.EMPLEADO, RoleEnum.ADMINISTRADOR]))
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.clientesService.remove(id);
  }

  @UseGuards(RoleGuard([RoleEnum.CLIENTE]))
  @UseGuards(AccessTokenGuard)
  @Post('direcciones')
  async addDireccion(
    @Body() createDireccionDto: CreateDireccionDto,
    @GetUsuarioActual() usuario: Usuario,
  ) {
    return this.clientesService.addDireccion(usuario, createDireccionDto);
  }

  @UseGuards(RoleGuard([RoleEnum.CLIENTE]))
  @UseGuards(AccessTokenGuard)
  @Delete('direcciones/:id')
  async removeDireccion(
    @Param('id') direccionId: number,
    @GetUsuarioActual() usuario: Usuario,
  ) {
    return this.clientesService.removeDireccion(usuario, direccionId);
  }
}
