import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Descuento {
  @PrimaryColumn()
  id: number;

  @Column()
  cantidad: number;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;
}
