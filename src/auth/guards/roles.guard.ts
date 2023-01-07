import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import { Role } from '../enums/role.enum';

const RolesGuard = (roles: Role[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      return roles.includes(user?.role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RolesGuard;
