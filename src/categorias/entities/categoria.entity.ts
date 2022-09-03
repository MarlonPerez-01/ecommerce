import { Length } from 'class-validator';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Producto } from '../../productos/entities/producto.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(2)
  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];

  @DeleteDateColumn()
  deletedAt: Date;
}
