import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Persona } from '../../personas/entities/persona.entity';

@Entity()
export class CreateClienteDto {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Persona)
  @JoinColumn()
  persona: Persona;

  @Column()
  telefono: number;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
