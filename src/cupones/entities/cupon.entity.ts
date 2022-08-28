import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  // TODO: se debe asignar una relacion con productos
  @Column()
  productos: [];

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
