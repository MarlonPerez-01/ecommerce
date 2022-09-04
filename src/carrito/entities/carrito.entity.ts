import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DetalleCarrito } from '../../detalle-carritos/entities/detalle-carrito.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity()
export class Carrito {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario: Usuario;

  @OneToMany(() => DetalleCarrito, (detalleCarrito) => detalleCarrito.carrito)
  detalleCarritos: DetalleCarrito[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
