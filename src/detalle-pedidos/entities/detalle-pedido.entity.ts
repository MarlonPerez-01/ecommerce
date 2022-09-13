import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.detallePedidos)
  pedido: Pedido;

  @Column({ type: 'int', nullable: false })
  productoId: number;

  @ManyToOne(() => Producto, (producto) => producto.detalleCarritos)
  @JoinColumn({ name: 'productoId' })
  producto: Producto;

  @Column('smallint')
  cantidad: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  precio: number;
}
