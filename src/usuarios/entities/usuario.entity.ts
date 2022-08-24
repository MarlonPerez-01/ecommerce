import {
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Cliente, (cliente) => cliente.usuario)
  cliente: Cliente;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
