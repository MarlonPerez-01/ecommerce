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
import { Token } from '../../tokens/entities/token.entity';

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

  @OneToMany(() => Token, (token) => token.usuario)
  tokens: Token[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;

  @OneToMany(() => Codigo, (codigo) => codigo.usuario)
  codigos: string[];
}
