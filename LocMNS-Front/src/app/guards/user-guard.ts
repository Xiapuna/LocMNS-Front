import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.jwtInfo()?.role != 'USER' && authService.jwtInfo()?.role != 'ADMIN') {
    const router = inject(Router);
    return router.parseUrl('/login');
  }

  return true;
};
