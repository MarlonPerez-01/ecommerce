import {
  Body,
  Controller,
  Delete,
  Get,
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
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  findAll(@Query() findPedidosDTO: FindPedidosDto) {
    return this.pedidosService.findAll(findPedidosDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pedidosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pedidosService.remove(id);
  }
}
