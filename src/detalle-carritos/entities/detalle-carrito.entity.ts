import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Carrito } from '../../carrito/entities/carrito.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity()
export class DetalleCarrito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  carritoId: number;

  @ManyToOne(() => Carrito, (carrito) => carrito.detalleCarritos)
  @JoinColumn({ name: 'carritoId' })
  carrito: Carrito;

  @Column({ type: 'int', nullable: false })
  productoId: number;

  @ManyToOne(() => Producto, (producto) => producto.detalleCarritos)
  @JoinColumn({ name: 'productoId' })
  producto: Producto;

  @Column()
  cantidad: number;
}
