import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  disponible: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  entrante: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  estropeado: number;
}
