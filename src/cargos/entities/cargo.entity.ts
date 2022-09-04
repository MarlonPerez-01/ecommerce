import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Empleado } from '../../empleados/entities/empleado.entity';

@Entity()
export class Cargo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Empleado, (empleado) => empleado.cargo)
  empleados: Empleado[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
