import { RoleEnum } from '../../common/enums/role.enum';

export interface JwtAccessPayload {
  sub: number;
  correo: string;
  nombre: string;
  role: RoleEnum;
  iat: number;
  exp: number;
}
