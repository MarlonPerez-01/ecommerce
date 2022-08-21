import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Municipio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
