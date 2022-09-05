import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity()
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  primerNombre: string;

  @Column({ nullable: true })
  segundoNombre: string;

  @Column()
  primerApellido: string;

  @Column({ nullable: true })
  segundoApellido: string;

  @Column()
  empresa: string;

  @Column({ nullable: true })
  telefono: number;

  @Column({ nullable: true })
  correo: string;

  @OneToMany(() => Pedido, (pedido) => pedido.proveedor)
  pedidos: Pedido[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
