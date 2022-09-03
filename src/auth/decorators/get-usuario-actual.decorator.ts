import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { RequestWithUser } from '../interfaces/requestWithUser.interface';

export const GetUsuarioActual = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    return request.user;
  },
);
