import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user/user.service';

export const adminGuard: CanActivateFn = () => {
  const _userService = inject(UserService);
  const router = inject(Router);

  if (_userService.user?.role === 'ADMIN_ROLE') {
    return true;
  } else {
    router.navigateByUrl('/dashboard');
    return false;
  }
};
