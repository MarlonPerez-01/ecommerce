import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Producto } from '../../productos/entities/producto.entity';

@Entity()
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productoId: number;

  @OneToOne(() => Producto, (producto) => producto.inventario)
  @JoinColumn({ name: 'productoId' })
  producto: Producto;

  @Column({ default: 0 })
  cantidad: number;

  @Column({ default: 0 })
  entrante: number;

  @Column({ default: 0 })
  estropeado: number;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
