import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { Producto } from '../../productos/entities/producto.entity';

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
