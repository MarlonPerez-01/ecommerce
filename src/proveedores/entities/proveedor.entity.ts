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

  @Column({ nullable: true })
  segundoNombre: string;

  @Column()
  primerApellido: string;

  @Column({ nullable: true })
  segundoApellido: string;

  @Column()
  empresa: string;

  @Column({ nullable: true })
  telefono: number;

  @Column({ nullable: true })
  correo: string;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
