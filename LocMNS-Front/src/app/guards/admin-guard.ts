import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.jwtInfo()?.role == null) {
    return router.parseUrl('/login');
  }

  if (authService.jwtInfo()?.role != 'ADMIN') {
    const notification = inject(NotificationService);
    notification.open(
      "Vous n'avez pas accès à cette page, connectez vous à un autre compte",
      'error',
    );
    return router.parseUrl('/login');
  }

  return true;
};
