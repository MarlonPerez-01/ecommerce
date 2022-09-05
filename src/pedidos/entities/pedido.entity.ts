import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DetallePedido } from '../../detalle-pedidos/entities/detalle-pedido.entity';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.pedidos)
  proveedor: Proveedor;

  @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.pedido)
  detallePedidos: DetallePedido[];

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  total: number;

  @Column()
  estadoEnvio: string;

  @Column()
  estadoPago: string;

  @CreateDateColumn()
  createdAt: Date;
}
