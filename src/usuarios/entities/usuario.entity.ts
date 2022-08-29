import {
  Column,
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

  @Column()
  correo: string;

  @Column()
  contrasenia: string;

  @OneToOne(() => Cliente, (cliente) => cliente.usuario)
  cliente: Cliente;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
