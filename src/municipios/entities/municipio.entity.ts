import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Departamento } from '../../departamentos/entities/departamento.entity';

@Entity()
export class Municipio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Departamento, (departamento) => departamento.municipios)
  departamento: Departamento;
}
