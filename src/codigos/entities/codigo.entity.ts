import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CodigoEnum } from '../../common/enums/codigo.enum';
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

  @Column({ type: 'varchar', length: 8, nullable: true })
  codigo: string;

  @Index()
  @Column({
    type: 'enum',
    enum: CodigoEnum,
    default: CodigoEnum.VERIFICACION,
  })
  tipo: CodigoEnum;

  @Column()
  fechaExpiracion: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
