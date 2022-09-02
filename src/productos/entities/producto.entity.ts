import { Descuento } from '../../descuentos/entities/descuento.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Marca } from '../../marcas/entities/marca.entity';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Proveedor } from '../../proveedores/entities/proveedor.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  sku: string;

  @Column({ unique: true })
  slug: string;

  @ManyToOne(() => Marca, (marca) => marca.productos, { cascade: ['insert'] })
  marca: Marca;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos, {
    cascade: ['insert'],
  })
  categoria: Categoria;

  @OneToOne(() => Proveedor, { nullable: true })
  @JoinColumn()
  proveedor: Proveedor;

  @Column('jsonb', { nullable: true })
  propiedades: any;

  // FIXME: debe estar en una tabla separada
  @Column({ nullable: true })
  imagenes: string;

  @Column('decimal', { precision: 6, scale: 2 })
  precioTienda: number;

  @Column('decimal', { precision: 6, scale: 2 })
  precioVenta: number;

  @OneToOne(() => Descuento, (descuento) => descuento.producto)
  descuento: Descuento;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ default: false })
  disponible: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
