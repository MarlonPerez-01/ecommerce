import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Proveedor {
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

  @Column()
  empresa: string;

  @Column()
  telefono: number;

  @Column()
  correo: number;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
