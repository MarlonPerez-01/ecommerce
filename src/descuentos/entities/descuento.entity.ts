import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Producto } from '../../productos/entities/producto.entity';

@Entity()
export class Descuento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productoId: number;

  @OneToOne(() => Producto, { cascade: ['insert', 'update'] })
  @JoinColumn({ name: 'productoId' })
  producto: Producto;

  @Column()
  cantidad: number;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;
}
