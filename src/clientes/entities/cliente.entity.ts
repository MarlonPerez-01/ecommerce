import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Persona } from '../../personas/entities/persona.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  personaId: number;

  @OneToOne(() => Persona)
  @JoinColumn({ name: 'personaId' })
  persona: Persona;

  @Column({ type: 'int', nullable: false })
  usuarioId: number;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
