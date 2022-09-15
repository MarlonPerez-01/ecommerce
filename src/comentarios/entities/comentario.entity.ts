import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Cliente } from '../../clientes/entities/cliente.entity';
import { Producto } from '../../productos/entities/producto.entity';

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

  @OneToOne(() => Producto)
  @JoinColumn({ name: 'productoId' })
  producto: Producto;

  @Column()
  puntuacion: number;

  @CreateDateColumn()
  fechaCreacion: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
