import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Municipio } from '../../municipios/entities/municipio.entity';

@Entity()
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Municipio, (municipio) => municipio.departamento)
  municipios: Municipio[];
}
