import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DetalleCarritosService } from '../detalle-carritos/detalle-carritos.service';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { AddProductoDto } from './dto/add-producto.dto';
import { UpdateProductoCarritoDto } from './dto/update-producto-carrito.dto';
import { Carrito } from './entities/carrito.entity';

@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(Carrito)
    private readonly carritoRepository: Repository<Carrito>,
    private readonly detalleCarritoService: DetalleCarritosService,
  ) {}

  async create(usuario: Usuario) {
    const carrito = await this.carritoRepository.findOne({
      where: { usuario: { id: usuario.id } },
    });

    if (carrito) throw new BadRequestException('El carrito ya existe');

    return this.carritoRepository.save({ usuario });
  }

  async addProducto(
    carritoId: number,
    usuarioId: number,
    addProductoDto: AddProductoDto,
  ) {
    // Agregar producto a detalleCarrito si no existe el producto en el carrito del usuario

    // TODO: optimizar query
    const carrito = await this.carritoRepository.findOne({
      where: { usuario: { id: usuarioId }, id: carritoId },
      relations: ['detalleCarritos', 'detalleCarritos.producto'],
    });

    if (!carrito) throw new BadRequestException('El carrito no existe');

    const producto = carrito?.detalleCarritos?.find(
      (detalleCarrito) =>
        detalleCarrito.productoId === addProductoDto.productoId,
    );

    if (producto)
      throw new BadRequestException('El producto ya existe en el carrito');

    // TODO: validar que exista producto con el id enviado

    await this.detalleCarritoService.create(addProductoDto, carrito);

    return carrito;
  }

  async findByUsuarioId(usuarioId: number) {
    // TODO: optimizar query
    return this.carritoRepository.findOne({
      where: { usuario: { id: usuarioId } },
      relations: ['detalleCarritos', 'detalleCarritos.producto'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} carrito`;
  }

  async findOneByIdUsuario(id: number) {
    return this.carritoRepository.findOne({ where: { usuario: { id } } });
  }

  async update(
    carritoId: number,
    productoId: number,
    usuarioId: number,
    updateCarritoDto: UpdateProductoCarritoDto,
  ) {
    // Obtengo el carrito del usuario actual si existe
    const carrito = await this.carritoRepository.findOneBy({
      usuario: { id: usuarioId },
      id: carritoId,
    });

    if (!carrito) throw new BadRequestException('El carrito no existe');

    return this.detalleCarritoService.update(
      carritoId,
      productoId,
      updateCarritoDto,
    );
  }

  async removeByProductoId(
    carritoId: number,
    productoId: number,
    usuarioId: number,
  ) {
    // Obtengo el carrito del usuario actual si existe
    const carrito = await this.carritoRepository.findOneBy({
      usuario: { id: usuarioId },
      id: carritoId,
    });

    if (!carrito) throw new BadRequestException('El carrito no existe');

    if (!carrito.detalleCarritos) {
      throw new BadRequestException('El carrito está vacio');
    }

    carrito.detalleCarritos.find((detalleCarrito) => {
      if (detalleCarrito.productoId !== productoId) {
        throw new NotFoundException('El producto no existe en el carrito');
      }
    });

    return this.detalleCarritoService.removeByProductoId(productoId, carritoId);
  }
}
