import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Orden } from '../../ordenes/entities/orden.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity()
export class DetalleOrden {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  ordenId: number;

  @ManyToOne(() => Orden, (orden) => orden.detalleOrdenes)
  @JoinColumn({ name: 'ordenId' })
  orden: Orden;

  @Column({ type: 'int', nullable: false })
  productoId: number;

  @ManyToOne(() => Producto, (producto) => producto.detalleCarritos)
  @JoinColumn({ name: 'productoId' })
  producto: Producto;

  @Column()
  cantidad: number;

  @Column()
  precio: number;

  @Column()
  total: number;
}
