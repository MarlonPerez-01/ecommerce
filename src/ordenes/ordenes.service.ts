import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { paginate } from '../common/helpers/paginate';
import { Producto } from '../productos/entities/producto.entity';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { FindOrdenesDto } from './dto/find-ordenes.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { Orden } from './entities/orden.entity';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Orden)
    private readonly ordenesRepository: Repository<Orden>,
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>,
  ) {}

  async create(createOrdeneDto: CreateOrdenDto) {
    let total = 0;

    // Obtener los productos de la base de datos
    const productos = await this.productosRepository.find({
      where: createOrdeneDto.detalleOrdenes.map((detalle) => ({
        id: detalle.productoId,
      })),
      relations: ['descuento', 'inventario'],
    });

    // Evaluar si los productos existen
    createOrdeneDto.detalleOrdenes.find((detalle) => {
      const producto = productos.find(
        (producto) => producto.id === detalle.productoId,
      );

      if (!producto) {
        throw new BadRequestException(
          `El producto con id ${detalle.productoId} no existe`,
        );
      }

      if (producto.inventario.cantidad < detalle.cantidad) {
        throw new BadRequestException(
          `El producto con id ${detalle.productoId} no tiene suficiente inventario`,
        );
      } else {
        producto.inventario.cantidad -= detalle.cantidad;
      }

      total += producto.precioVenta * detalle.cantidad;
    });

    // Crear la orden y sus detalles
    const orden = this.ordenesRepository.create({
      detalleOrdenes: createOrdeneDto.detalleOrdenes.map((detalle) => ({
        productoId: detalle.productoId,
        cantidad: detalle.cantidad,
      })),
      total,
    });

    // Actualizar el inventario en la base de datos
    await this.productosRepository.save(productos);

    // Guardar la orden en la base de datos
    return this.ordenesRepository.save(orden);
  }

  async findAll(findOrdenesDTO: FindOrdenesDto) {
    const { page, limit, sort, order } = findOrdenesDTO;

    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.ordenesRepository.findAndCount({
      take: limit,
      skip,
      order: { [sort]: order },
    });

    const pagination = paginate(page, limit, totalItems);

    return {
      data,
      totalItems,
      ...pagination,
    };
  }

  async findOne(id: number) {
    return this.ordenesRepository.findOne({
      where: { id },
      relations: ['detalleOrdenes', 'detalleOrdenes.producto'],
    });
  }

  async update(id: number, updatePedidoDto: UpdateOrdenDto) {
    return `This action updates a #${id} pedido`;
  }

  async remove(id: number) {
    return this.ordenesRepository.delete(id);
  }
}
