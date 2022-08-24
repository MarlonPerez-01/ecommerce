import { Producto } from 'src/productos/entities/producto.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(3)
  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];

  @DeleteDateColumn()
  deletedAt: Date;
}
