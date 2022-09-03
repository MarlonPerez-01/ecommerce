import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idUsuario: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.tokens)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @Column()
  token: string;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
