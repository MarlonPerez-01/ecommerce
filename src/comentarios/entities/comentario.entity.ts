import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity()
export class Comentario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comentario: string;

  @ManyToOne(() => Cliente)
  cliente: Cliente;

  @Column()
  productoId: number;

  @Column()
  puntuacion: number;

  @CreateDateColumn()
  fechaCreacion: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
