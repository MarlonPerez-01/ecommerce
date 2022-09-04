import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DetalleOrden } from '../../detalle-ordenes/entities/detalle-orden.entity';

@Entity()
export class Orden {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => DetalleOrden, (detalleOrden) => detalleOrden.orden)
  detalleOrdenes: DetalleOrden[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
