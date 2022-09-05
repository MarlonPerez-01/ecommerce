import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RoleEnum } from '../../common/enums/role.enum';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.CLIENTE,
  })
  role: RoleEnum;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
