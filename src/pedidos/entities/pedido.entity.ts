import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  estadoEnvio: string;

  @Column()
  estadoPago: string;

  @CreateDateColumn()
  createdAt: Date;
}
