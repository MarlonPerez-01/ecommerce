import {Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class CreatePersonaDto {
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
  telefono: number;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
