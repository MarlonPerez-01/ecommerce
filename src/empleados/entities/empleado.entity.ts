import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Persona } from '../../personas/entities/persona.entity';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Persona, { nullable: false })
  @JoinColumn()
  persona: Persona;

  // TODO: cambiar la propiedad a una tabla separada
  @Column()
  cargo: string;

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
