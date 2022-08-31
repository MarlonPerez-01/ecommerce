import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Codigo } from '../../codigos/entities/codigo.entity';

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

  @OneToMany(() => Codigo, (codigo) => codigo.usuario)
  codigos: string[];
}
