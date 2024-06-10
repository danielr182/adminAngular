import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const loginGuard: CanActivateFn = () => {
  const _userService = inject(UserService);
  const router = inject(Router);

  return _userService.validateToken().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigateByUrl('/login');
      }
    })
  );
};
