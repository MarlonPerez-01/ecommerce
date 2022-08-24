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
export class Marca {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(2)
  @Column({ unique: true })
  nombre: string;

  @Column({ unique: true, nullable: true })
  imagen: string;

  @OneToMany(() => Producto, (producto) => producto.marca)
  productos: Producto[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
