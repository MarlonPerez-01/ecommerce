import { DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TipoUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
