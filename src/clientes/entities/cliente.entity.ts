import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Direccion } from '../../direcciones/entities/direccion.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Usuario)
  usuario: Usuario;

  @OneToOne(() => Direccion)
  direccion: Direccion;
}
