import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DetallePedido } from '../detalle-pedidos/entities/detalle-pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    const total = createPedidoDto.detallePedidos.reduce((acc, cur) => {
      return acc + cur.cantidad * cur.precio;
    }, 0);

    const pedido = this.pedidoRepository.create({
      proveedorId: createPedidoDto.proveedorId,
      detallePedidos: createPedidoDto.detallePedidos.map((detalle) => ({
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        productoId: detalle.productoId,
      })),
      total,
    });

    return this.pedidoRepository.save(pedido);
  }

  async findAll() {
    return `This action returns all pedidos`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  async remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
