import {
  Column,
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

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
