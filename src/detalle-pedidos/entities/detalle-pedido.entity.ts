import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  precio: number;
}
