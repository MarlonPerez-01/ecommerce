import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ type: 'int', nullable: false })
  proveedorId: number;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.pedidos)
  @JoinColumn({ name: 'proveedorId' })
  proveedor: Proveedor;

  @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.pedido, {
    cascade: ['insert', 'update'],
  })
  detallePedidos: DetallePedido[];

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  total: number;

  @Column({ default: 'Pendiente' })
  estadoEnvio: string;

  @Column({ default: 'Pendiente' })
  estadoPago: string;

  @CreateDateColumn()
  createdAt: Date;
}
