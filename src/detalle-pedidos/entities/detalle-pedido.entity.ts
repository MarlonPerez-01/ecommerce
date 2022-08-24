import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.detallePedidos)
  pedido: Pedido;

  @Column('smallint')
  cantidad: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  precio: number;
}
