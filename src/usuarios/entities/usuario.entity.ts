import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Codigo } from '../../codigos/entities/codigo.entity';
import { Persona } from '../../personas/entities/persona.entity';
import { Role } from '../../roles/entities/roles.entity';
import { Token } from '../../tokens/entities/token.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  correo: string;

  @Column()
  contrasenia: string;

  @OneToOne(() => Persona)
  @JoinColumn()
  persona: Persona;

  @Column({ type: 'int', nullable: false })
  roleId: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @OneToMany(() => Token, (token) => token.usuario)
  tokens: Token[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @OneToMany(() => Codigo, (codigo) => codigo.usuario)
  codigos: string[];
}
