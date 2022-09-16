import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import RoleGuard from '../auth/guards/role.guard';
import { RoleEnum } from '../common/enums/role.enum';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { FindPedidosDto } from './dto/find-pedidos.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidosService } from './pedidos.service';

@ApiTags('pedidos')
@Controller('pedidos')
@UseGuards(RoleGuard([RoleEnum.ADMINISTRADOR, RoleEnum.EMPLEADO]))
@UseGuards(AccessTokenGuard)
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  async create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  async findAll(@Query() findPedidosDTO: FindPedidosDto) {
    return this.pedidosService.findAll(findPedidosDTO);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const pedido = await this.pedidosService.findOne(id);
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return pedido;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ) {
    const pedido = await this.findOne(id);
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return this.pedidosService.update(id, updatePedidoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const pedido = await this.findOne(id);
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return this.pedidosService.remove(id);
  }
}
