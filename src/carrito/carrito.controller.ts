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
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CarritoService } from './carrito.service';
import { AddProductoDto } from './dto/add-producto.dto';
import { UpdateProductoCarritoDto } from './dto/update-producto-carrito.dto';

@ApiTags('carrito')
@UseGuards(AccessTokenGuard)
@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Post()
  create(@GetUsuarioActual() usuario: Usuario) {
    return this.carritoService.create(usuario);
  }

  @Post(':carritoId')
  addProducto(
    @GetUsuarioActual() usuario: Usuario,
    @Param('carritoId') carritoId: number,
    @Body() addProductoDto: AddProductoDto,
  ) {
    return this.carritoService.addProducto(
      carritoId,
      usuario.id,
      addProductoDto,
    );
  }

  @Get()
  async findByUsuarioById(@GetUsuarioActual() usuario: Usuario) {
    return this.carritoService.findByUsuarioId(usuario.id);
  }

  @Patch(':carritoId/productos/:productoId')
  async update(
    @Param('carritoId') carritoId: number,
    @Param('productoId') productoId: number,
    @GetUsuarioActual() usuario: Usuario,
    @Body() updateCarritoDto: UpdateProductoCarritoDto,
  ) {
    return this.carritoService.update(
      carritoId,
      productoId,
      usuario.id,
      updateCarritoDto,
    );
  }

  @Delete(':carritoId/productos/:productoId')
  async remove(
    @Param('carritoId') carritoId: number,
    @Param('productoId') productoId: number,
    @GetUsuarioActual() usuario: Usuario,
  ) {
    return this.carritoService.removeByProductoId(
      carritoId,
      productoId,
      usuario.id,
    );
  }
}
