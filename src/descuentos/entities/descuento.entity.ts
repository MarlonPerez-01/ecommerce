import { Producto } from 'src/productos/entities/producto.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Descuento {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => Producto)
  @JoinColumn()
  producto: Producto;

  @Column()
  cantidad: number;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;
}
