import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { paginate } from '../common/helpers/paginate';
import { DetallePedido } from '../detalle-pedidos/entities/detalle-pedido.entity';
import { Inventario } from '../inventarios/entities/inventario.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { FindPedidosDto } from './dto/find-pedidos.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidosRepository: Repository<Pedido>,
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,

    @InjectRepository(Inventario)
    private readonly inventariosRepository: Repository<Inventario>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    const total = createPedidoDto.detallePedidos.reduce((acc, cur) => {
      return acc + cur.cantidad * cur.precio;
    }, 0);

    const pedido = this.pedidosRepository.create({
      proveedorId: createPedidoDto.proveedorId,
      detallePedidos: createPedidoDto.detallePedidos.map((detalle) => ({
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        productoId: detalle.productoId,
      })),
      total,
    });

    return this.pedidosRepository.save(pedido);
  }

  async findAll(findPedidosDTO: FindPedidosDto) {
    const { page, limit, sort, order } = findPedidosDTO;

    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.pedidosRepository.findAndCount({
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
    return this.pedidosRepository.findOne({
      where: { id },
      relations: ['detallePedidos', 'detallePedidos.producto'],
    });
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  async remove(id: number) {
    return this.pedidosRepository.delete(id);
  }
}
