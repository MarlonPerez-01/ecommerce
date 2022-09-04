import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Direccion } from '../../direcciones/entities/direccion.entity';

@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  primerNombre: string;

  @Column({ nullable: true })
  segundoNombre: string;

  @Column()
  primerApellido: string;

  @Column({ nullable: true })
  segundoApellido: string;

  @Column({ nullable: true })
  telefono: number;

  @Column({ nullable: true })
  foto: string;

  @OneToMany(() => Direccion, (direccion) => direccion.persona)
  direcciones: Direccion[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
