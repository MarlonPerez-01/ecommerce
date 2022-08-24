import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.pedidos)
  proveedor: Proveedor;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  total: number;

  @Column()
  estadoEnvio: string;

  @Column()
  estadoPago: string;

  @CreateDateColumn()
  createdAt: Date;
}
