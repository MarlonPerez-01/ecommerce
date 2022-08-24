import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Departamento } from '../../departamentos/entities/departamento.entity';
import { Municipio } from '../../municipios/entities/municipio.entity';

@Entity()
export class Direccion {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Departamento)
  departamento: Departamento;

  @OneToOne(() => Municipio)
  municipio: Municipio;

  @Column()
  detalle: string;
}
