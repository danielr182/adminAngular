import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../user/user.service';

export const AdminGuard: CanActivateFn = () => {
  const _userService = inject(UserService);
  if (_userService.user?.role === 'ADMIN_ROLE') {
    return true;
  } else {
    _userService.logOut();
    return false;
  }
};
