import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity()
export class Codigo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.codigos)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @Column({ type: 'varchar', length: 8, nullable: false })
  codigo: string;

  @Column()
  tipo: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  fechaExpiracion: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
