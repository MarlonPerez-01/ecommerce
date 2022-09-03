import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Carrito } from '../carrito/entities/carrito.entity';
import { CreateDetalleCarritoDto } from './dto/create-detalle-carrito.dto';
import { UpdateDetalleCarritoDto } from './dto/update-detalle-carrito.dto';
import { DetalleCarrito } from './entities/detalle-carrito.entity';

@Injectable()
export class DetalleCarritosService {
  constructor(
    @InjectRepository(DetalleCarrito)
    private readonly detalleCarritoRepository: Repository<DetalleCarrito>,
  ) {}

  // TODO: validar que la cantidad no sea mayor al stock disponible
  create(createDetalleCarritoDto: CreateDetalleCarritoDto, carrito: Carrito) {
    const detalleCarrito = this.detalleCarritoRepository.create({
      carrito,
      productoId: createDetalleCarritoDto.productoId,
      cantidad: createDetalleCarritoDto.cantidad,
    });
    return this.detalleCarritoRepository.save(detalleCarrito);
  }

  findAll() {
    return `This action returns all detalleCarritos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleCarrito`;
  }

  async findOneByIdProducto(productoId: number) {
    return this.detalleCarritoRepository.findOne({
      where: { productoId },
    });
  }

  async update(
    carritoId: number,
    productoId: number,
    updateDetalleCarritoDto: UpdateDetalleCarritoDto,
  ) {
    return this.detalleCarritoRepository.update(
      { carritoId, productoId },
      { cantidad: updateDetalleCarritoDto.cantidad },
    );
  }

  async removeByProductoId(productoId: number, carritoId: number) {
    return this.detalleCarritoRepository.delete({ productoId, carritoId });
  }
}
