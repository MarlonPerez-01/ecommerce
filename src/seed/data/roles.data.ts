import { RoleEnum } from '../../common/enums/role.enum';
import { Role } from '../../roles/entities/roles.entity';

export const rolesData: Role[] = [
  {
    id: 1,
    role: RoleEnum.ADMINISTRADOR,
    deletedAt: null,
  },
  {
    id: 2,
    role: RoleEnum.EMPLEADO,
    deletedAt: null,
  },
  {
    id: 3,
    role: RoleEnum.CLIENTE,
    deletedAt: null,
  },
];
