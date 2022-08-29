import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Direccion } from '../../direcciones/entities/direccion.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  usuarioId: number;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @Column({ type: 'int', nullable: false })
  direccionId: number;

  @OneToOne(() => Direccion)
  @JoinColumn({ name: 'direccionId' })
  direccion: Direccion;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
