import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Marca } from 'src/marcas/entities/marca.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Descuento } from '../../descuentos/entities/descuento.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  sku: string;

  @ManyToOne(() => Marca, (marca) => marca.productos)
  marca: Marca;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria: Categoria;

  @Column('decimal', { precision: 6, scale: 2 })
  precioTienda: number;

  @Column('decimal', { precision: 6, scale: 2 })
  precioVenta: number;

  @OneToOne(() => Descuento, (descuento) => descuento.producto)
  descuento: Descuento;

  @Column()
  descripcion: string;

  @Column()
  disponible: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
