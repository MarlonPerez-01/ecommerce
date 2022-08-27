import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  primerNombre: string;

  @Column()
  segundoNombre: string;

  @Column()
  primerApellido: string;

  @Column()
  segundoApellido: string;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
