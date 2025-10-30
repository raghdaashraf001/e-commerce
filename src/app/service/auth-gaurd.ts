import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { UserAuthentication } from '../service/user-authentication';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(UserAuthentication);

  if (!authService.getLoginStatus()) {
    return router.createUrlTree(['/login']);
  }

  return true;
};

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(UserAuthentication);

  if (authService.getLoginStatus()) {
    return router.createUrlTree(['/home']);
  }

  return true;
};
