import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

import { RoleEnum } from '../../common/enums/role.enum';
import { RequestWithUser } from '../interfaces/requestWithUser.interface';

const RoleGuard = (role: RoleEnum[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      return role.some((role) => user?.role.role.includes(role));
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
