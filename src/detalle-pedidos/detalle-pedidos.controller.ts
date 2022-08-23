import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetallePedidosService } from './detalle-pedidos.service';
import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle-pedido.dto';

@Controller('detalle-pedidos')
export class DetallePedidosController {
  constructor(private readonly detallePedidosService: DetallePedidosService) {}

  @Post()
  create(@Body() createDetallePedidoDto: CreateDetallePedidoDto) {
    return this.detallePedidosService.create(createDetallePedidoDto);
  }

  @Get()
  findAll() {
    return this.detallePedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallePedidosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetallePedidoDto: UpdateDetallePedidoDto) {
    return this.detallePedidosService.update(+id, updateDetallePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallePedidosService.remove(+id);
  }
}
