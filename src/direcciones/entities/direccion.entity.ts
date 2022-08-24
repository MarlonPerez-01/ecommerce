import {Column, PrimaryGeneratedColumn} from 'typeorm';

export class Direccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detalle: string;
}
