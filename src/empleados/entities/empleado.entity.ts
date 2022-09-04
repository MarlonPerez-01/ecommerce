import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Cargo } from '../../cargos/entities/cargo.entity';
import { Persona } from '../../personas/entities/persona.entity';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Persona, { nullable: false })
  @JoinColumn()
  persona: Persona;

  @Column()
  cargoId: number;

  @ManyToOne(() => Cargo, (cargo) => cargo.empleados)
  cargo: Cargo;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  salario: number;

  @Column()
  genero: string;

  @Column()
  fechaNacimiento: Date;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
