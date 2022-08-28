import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cargo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
