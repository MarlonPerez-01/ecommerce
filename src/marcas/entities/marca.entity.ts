import { Producto } from 'src/productos/entities/producto.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Marca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ unique: true })
  imagen: string;

  @OneToMany(() => Producto, (producto) => producto.marca)
  productos: Producto[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
