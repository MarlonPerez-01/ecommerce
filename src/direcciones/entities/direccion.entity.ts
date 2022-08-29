import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Departamento } from '../../departamentos/entities/departamento.entity';
import { Municipio } from '../../municipios/entities/municipio.entity';

@Entity()
export class Direccion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  departamentoId: number;

  @ManyToOne(() => Departamento)
  @JoinColumn({ name: 'departamentoId' })
  departamento: Departamento;

  @Column({ type: 'int', nullable: false })
  municipioId: number;

  @ManyToOne(() => Municipio)
  @JoinColumn({ name: 'municipioId' })
  municipio: Municipio;

  @Column()
  detalle: string;
}
