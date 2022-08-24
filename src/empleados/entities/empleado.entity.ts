import { DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
